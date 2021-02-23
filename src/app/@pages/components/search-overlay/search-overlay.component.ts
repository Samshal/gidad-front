import { Component, OnInit, OnDestroy,HostBinding,ElementRef,Input,HostListener,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { fadeAnimation } from '../../animations/fade-animations';
import { pagesToggleService} from '../../services/toggler.service';
import { SearchResult } from './search-result';
import { SearchService } from './search.service';
import { EventPublisherService } from '../../../event-publisher.service';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  animations   : [
    fadeAnimation
  ],
  styleUrls: ['./search-overlay.component.scss'],
  providers: [SearchService]
})
export class SearchOverlayComponent implements OnDestroy {
  toggleSubscription : Subscription;
  _isEnabled:boolean = false;
  isVisible:boolean = false;
  value:string = "";
  modal:SearchResult;
  suggestions: Array<any> = [];
  countryJson;

  constructor(private el: ElementRef,private toggler:pagesToggleService, 
              private searchService: SearchService, private events: EventPublisherService) {
    this.toggleSubscription = this.toggler.searchToggle.subscribe((toggleValue) => { this.open() });
  }
  ngOnDestroy() {
    this.toggleSubscription.unsubscribe();
  }

  @Input() set isEnabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
  }
  get isEnabled() {
    return this._isEnabled;
  }

  close($event){
    $event.preventDefault();
  	this.isVisible = false;
  	this.value = "";
  }

  open(){
    this.isVisible = true;
    this.value = "";
    setTimeout(()=>{   
      this.searchField.nativeElement.focus();
    },200);
  }
  @ViewChild('searchField')
  searchField: any;

  @HostListener('document:keypress', ['$event']) onKeydownHandler(e) {
    var nodeName = e.target.nodeName;
    //Ignore When focus on input, textarea & contenteditable
    if (nodeName == 'INPUT' || nodeName == 'TEXTAREA' || e.target.contentEditable == "true") {
        return;
    }

    //Ignore Escape
  	if (this.isVisible && e.keyCode == 27) {
  		this.isVisible = false;
  		this.value = "";
  	}
    //Ignore Keys
    if (e.which !== 0 && e.charCode !== 0 && !e.ctrlKey && !e.metaKey && !e.altKey && e.keyCode != 27) {
    	this.isVisible = true;
    	if(!this.value)
        	this.value = String.fromCharCode(e.keyCode | e.charCode);
          
      this.searchField.nativeElement.focus();
    }
  }

  searchKeyPress(event){
    if (this.isVisible && event.keyCode == 27) {
      this.isVisible = false;
      this.value = "";
    }

    if (this.isVisible){
      this.searchService.searchEsriGeocoder(this.value).subscribe(response => this.displaySuggestions(response))
    }

    if (this.isVisible && event.keyCode == 13) {
      this.searchService.searchEsriGeocoder(this.value).subscribe(response => this.displaySuggestions(response))
      // console.log(this.value)
    }
  }

  displaySuggestions(response){
    let candidates = response.candidates
    if (response.candidates){
      this.suggestions = candidates
    }
    else {
      this.suggestions = []
    }
  }

  getCountryNameFromCode(code: string) {
    let country = code;
    if (this.countryJson == null){
      this.searchService.getCountryJson().subscribe(response => this.countryJson = response && this.getCountryNameFromCode(code))
    }
    else {
      country = this.countryJson.filter(function(data){ return data.code == code })
      country = country["name"]
    }

    return country;
  }

  fadeInComplete(){
    console.log("complete")
  }

  showCoordOnMap(latlon){
    const data = {"lat":latlon["y"], "lng":latlon["x"]};
  	this.isVisible = false;
  	this.value = "";
    this.events.publishEvent("panToCoord", JSON.stringify(data))
  }

  zoomToBounds(bounds){
    this.events.publishEvent("zoomToBounds", JSON.stringify(bounds))
  }

  addSearchResultToDataExplorer(name: string, latlon, extra_info: string){
    const geoJson = {
      "type":"Feature",
      "properties":{ },
      "geometry":{
        "type":"Point",
        "coordinates":[latlon["x"], latlon["y"]]
      }
    };

    const vector_layer = {
      "name": name,
      "desc":extra_info,
      "layer": geoJson
    }

    this.events.publishEvent("addVectorLayerToDataExplorer", JSON.stringify(vector_layer))
  }

  displaySearchResult(name, desc, latlon, bounds){
  	this.isVisible = false;
  	this.value = "";
    this.addSearchResultToDataExplorer(name, latlon, desc)
    this.zoomToBounds(bounds)
  }
}
