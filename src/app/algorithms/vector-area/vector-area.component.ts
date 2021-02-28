import { Component, OnInit, Input } from '@angular/core';

import { LayersService } from '../../layers.service'
import { EventPublisherService } from '../../event-publisher.service';
import * as turf from '@turf/turf';
import  * as L from 'leaflet';

@Component({
  selector: 'app-vector-area',
  templateUrl: './vector-area.component.html',
  styleUrls: ['./vector-area.component.scss']
})
export class VectorAreaComponent implements OnInit {

  @Input()
  data;

  showLoading = true;
  computeData = {};
  
  layers = {}
  dataSelectors = {};

  allowedUnits = ["square kilometer", "square meter"];

  baseLayers = {};
  constructor(public layersService: LayersService) {
    this.bLayers.forEach(layer => {
      this.baseLayers[layer.name] = L.tileLayer(layer.url, layer.options)
    });
  }

  ngOnInit() {
    this.data = JSON.parse(this.data)
    this.loadFunction(this.data)
    this.showLoading = false;
  }

  counter(i: number) {
      return new Array(i);
  }

  retrieveLayers(_layers){
    _layers.forEach(element => {
      if (!(element in this.layers)){
        const layer = JSON.parse(this.layersService.getLayer(element).value)
        if (layer.state){
          this.layers[layer.id] = layer
        }
      }
    });
  }

  loadFunction(data){
    const _layers = this.layersService.getLayers().value
    this.retrieveLayers(JSON.parse(_layers))
    const inps = this.data.options.input
    for (const key in inps) {
      if (!(key in this.dataSelectors) && Object.prototype.hasOwnProperty.call(inps, key)) {
        this.dataSelectors[key] = []
        for (const layerId in this.layers) {
          if (Object.prototype.hasOwnProperty.call(this.layers, layerId)) {
            const layer = this.layers[layerId];
            const geomType = layer.layer.geometry.type;
            if (key == geomType){
              this.dataSelectors[key].push(layer)
            }
          }
        }
      }
    }
  }

  performComputation(){
    const polygon = turf.polygon(this.computeData["Polygon_0"].layer.geometry.coordinates);
    const units = this.computeData["units"];
    
    var area = turf.area(polygon);

    if (units == "square kilometer"){
      area = area / 1000000;
    }

    this.map.addLayer(L.geoJSON(this.computeData["Polygon_0"].layer).bindPopup("Area: "+area+" "+units).openPopup());
    this.map.fitBounds(L.geoJSON(this.computeData["Polygon_0"].layer).getBounds())
  }

  public map: L.Map = null;
  latlng = L.latLng(9.00498,7.51655)

  streetMaps = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: ''
  });

  bLayers = [
    {
      "name":"Open Street Map",
      "url":"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      "options":{
        "maxZoom":20
      }
    },
    {
      "name":"Open Topo Map",
      "url":"https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      "options":{
        "maxZoom":20
      }
    },
    {
      "name":"ESRI Street Map",
      "url":"https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      "options":{
        "maxZoom":20
      }
    },
    {
      "name":"ESRI Topo Map",
      "url":"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      "options":{
        "maxZoom":20
      }
    },
    {
      "name":"ESRI Terrain",
      "url":"https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
      "options":{
        "maxZoom":7
      }
    },
    {
      "name":"ESRI Imagery",
      "url":"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      "options":{
        "maxZoom":18
      }
    },
    {
      "name":"Google Streets",
      "url":"http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      "options":{
        "maxZoom":20,
        "subdomains":['mt0', 'mt1', 'mt2', 'mt3']
      }
    },
    {
      "name":"Google Hybrid",
      "url":"http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      "options":{
        "maxZoom":20,
        "subdomains":['mt0', 'mt1', 'mt2', 'mt3']
      }
    },
    {
      "name":"Google Terrain",
      "url":"http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}",
      "options":{
        "maxZoom":20,
        "subdomains":['mt0', 'mt1', 'mt2', 'mt3']
      }
    },
    {
      "name":"Google Imagery",
      "url":"http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      "options":{
        "maxZoom":20,
        "subdomains":['mt0', 'mt1', 'mt2', 'mt3']
      }
    }
  ]

  options = {
    layers: [
      this.streetMaps
    ],
    zoom: 8,
    zoomControl: false,
    center: this.latlng, //L.latLng(4.864040000000045, 6.969180000000051)
  };

  refreshMap() {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  onMapReady(map: L.Map) {
    this.map = map;
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map)
  }
}
