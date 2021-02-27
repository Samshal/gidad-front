import { Component, OnInit } from '@angular/core';

import { LayersService } from '../layers.service'
import { EventPublisherService } from '../event-publisher.service';

@Component({
  selector: 'app-layers-explorer',
  templateUrl: './layers-explorer.component.html',
  styleUrls: ['./layers-explorer.component.scss']
})
export class LayersExplorerComponent implements OnInit {

  constructor(public layersService: LayersService, public events: EventPublisherService) { }

  ngOnInit() {
    this.events.getEvents("addVectorLayerToDataExplorer").subscribe(response => this.addLayerFromEvent(JSON.parse(response)))
  }
  
  layer;
  layers = {
    
  }

  toggleLayer(object_name, state) {
    if (state == true){
      this.layersService.addLayer(this.layers[object_name])
    }
    else {
      this.layersService.removeLayer(this.layers[object_name]["name"])
    }
  }

  addLayer(name, desc, object){
    const id = Date.now();
    const layer = {
      "name":name,
      "layer":object,
      "desc":desc,
      "state":true,
      "id":id
    }
    this.layers[id] = layer;
    this.toggleLayer(id, true)
  }

  removeLayer(layer_id){
    this.toggleLayer(layer_id, false)
    delete this.layers[layer_id]
  }

  addLayerFromEvent(eventData){
    if (eventData !== null){
      this.addLayer(eventData["name"], eventData["desc"], eventData["layer"]);
    }
  }

}
