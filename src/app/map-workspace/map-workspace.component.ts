import { setStyles } from '@angular/animations/browser/src/util';
import { Component, OnInit } from '@angular/core';
import  * as L from 'leaflet';

import { LayersService } from '../layers.service';
import { EventPublisherService } from '../event-publisher.service';

@Component({
  selector: 'app-map-workspace',
  templateUrl: './map-workspace.component.html',
  styleUrls: ['./map-workspace.component.scss']
})
export class MapWorkspaceComponent implements OnInit {

  public map: L.Map = null;
  latlng = L.latLng(9.00498,7.51655)
  

  layerGroup = L.layerGroup()

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
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/img/leaflet/marker-icon.png',
          shadowUrl: 'assets/img/leaflet/marker-shadow.png'
        })
      },
      circleMarker: false
    }
  };

  drawOptions = {
    position: 'bottomleft',
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/img/leaflet/marker-icon.png',
          shadowUrl: 'assets/img/leaflet/marker-shadow.png'
        })
      }
    },
    edit: {
      remove:false,
      edit:false
    }
  }

  baseLayers = {
  }

  overlayLayers = {

  }

  constructor(public layersService: LayersService, public events: EventPublisherService) { 
    
    this.bLayers.forEach(layer => {
      this.baseLayers[layer.name] = L.tileLayer(layer.url, layer.options)
    });
  }

  ngOnInit() {
    this.layersService.getLayers().subscribe(layers => this.updateLayers(JSON.parse(layers)))
    this.initEventListeners()
  }

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

    this.map

    this.map.addLayer(this.layerGroup)
  }

  addLayersToMap(name, layerObject){
    if (layerObject != null){  
      this.overlayLayers[name] = L.geoJSON(layerObject.layer, {
        pointToLayer: function(feature, latlng) {
          var smallIcon = L.icon({
            iconSize: [ 25, 41 ],
            iconAnchor: [ 13, 41 ],
            iconUrl: 'assets/img/leaflet/marker-icon.png',
            shadowUrl: 'assets/img/leaflet/marker-shadow.png'
          })
          return L.marker(latlng, {icon: smallIcon});
        },
        style: {
          fill: false
        }
      })
      
      for (const layer in this.overlayLayers) {
        this.layerGroup.addLayer(this.overlayLayers[layer])
      }
      
      this.zoomToBounds(this.overlayLayers[name].getBounds())
    }

    this.map.addLayer(this.layerGroup)
  }

  updateLayers(layerObject){
    this.overlayLayers = {}
    if (this.map !== null){
      this.map.removeLayer(this.layerGroup)
    }
    this.layerGroup = L.layerGroup()

    layerObject.forEach(element => {
      this.layersService.getLayer(element).subscribe(_layerObj => this.addLayersToMap(element, JSON.parse(_layerObj)))
    });
  }

  zoomToBounds(bounds){
    this.map.fitBounds(bounds)
  }

  zoomToBoundsMinMax(bounds){
    if (bounds !== null){  
      bounds = [[bounds["ymin"], bounds["xmin"]], [bounds["ymax"], bounds["xmax"]]]
      this.zoomToBounds(bounds)
    }
  }

  panToCoord(latlon){
    if (latlon !== null){
      latlon = new L.LatLng(latlon["lat"], latlon["lng"])
      var bounds = latlon.toBounds(5000); // 500 = metres
      this.map.panTo(latlon).fitBounds(bounds);
    }
  }

  initEventListeners(){
    this.events.getEvents("panToCoord").subscribe(response => this.panToCoord(JSON.parse(response)))
    this.events.getEvents("zoomToBounds").subscribe(response => this.zoomToBoundsMinMax(JSON.parse(response)))
  }

  public onDrawCreated(e: any){
    const layer = e.layer
    this.map.removeLayer(layer)
    const geoJson = layer.toGeoJSON()

    const vector_layer = {
      "name": (e.layerType).toUpperCase(),
      "desc":"Annotation: Drawn on "+(new Date()  ).toLocaleDateString('en-US', {
        "hour":"numeric",
        "minute":"numeric",
        "second":"numeric"
      }),
      "layer": geoJson
    }

    this.events.publishEvent("addVectorLayerToDataExplorer", JSON.stringify(vector_layer))
  }
}
