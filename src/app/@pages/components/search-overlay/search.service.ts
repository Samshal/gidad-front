import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  private esriGeocoderUrl: string = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/"+
                                    "findAddressCandidates?"+
                                    "&outFields=Addr_type,Type,Place_Addr,Country"+
                                    "&f=json";
  private countryJsonUrl: string = "assets/data/country-codes.json";

  public searchEsriGeocoder(param: string) {
    let url: string = this.esriGeocoderUrl + `&address=${param}`;
    return this.http.get(url);
  }

  public getCountryJson() {
    return this.http.get(this.countryJsonUrl)
  }

}
