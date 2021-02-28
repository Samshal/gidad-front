import { Component, OnInit, Input } from '@angular/core';

import { LayersService } from '../../layers.service'
import { EventPublisherService } from '../../event-publisher.service';

@Component({
  selector: 'app-vector-along',
  templateUrl: './vector-along.component.html',
  styleUrls: ['./vector-along.component.scss']
})
export class VectorAlongComponent implements OnInit {

  @Input()
  data;
  
  layers = {}
  constructor(public layersService: LayersService) { }

  ngOnInit() {
    this.data = JSON.parse(this.data)
    this.loadFunction(this.data)
  }

  
  retrieveLayers(_layers){
    _layers.forEach(element => {
      if (!(element in this.layers)){
        const layer = JSON.parse(this.layersService.getLayer(element).value)
        this.layers[layer.id] = layer
      }
    });
  }

  loadFunction(data){
    const _layers = this.layersService.getLayers().value
    this.retrieveLayers(JSON.parse(_layers))
    console.log(this.layers);
  }
  

}
