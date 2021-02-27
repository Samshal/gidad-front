import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import  * as L from 'leaflet';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LayersService {

  layers = []

  constructor(public storageService: StorageService){
    this.storageService.setItem("layers", JSON.stringify(this.layers))
  }
  
  public addLayer(layerObject) {
    this.storageService.setItem(layerObject.id, JSON.stringify(layerObject));
    this.updateLayers(layerObject.id, "add");
  }

  public getLayers() {
    return this.storageService.getItem("layers");
  }

  public updateLayers(name, type){
    let layers = localStorage.getItem("layers")
    this.layers = JSON.parse(layers)
    if (type == "add"){
      this.layers.push(name)
    }
    else {
      const index = this.layers.indexOf(name);
      if (index > -1){
        this.layers.splice(index, 1)
      }
    }

    this.storageService.setItem("layers", JSON.stringify(this.layers))
  }

  public getLayer(layerName: string) {
    return this.storageService.getItem(layerName);
  }

  public removeLayer(layerName: string) {
    this.updateLayers(layerName, "remove");
    return this.storageService.removeItem(layerName);
  }
}
