import { Component, OnInit } from '@angular/core';

import { EventPublisherService } from '../event-publisher.service';

@Component({
  selector: 'app-tools-explorer-menu',
  templateUrl: './tools-explorer-menu.component.html',
  styleUrls: ['./tools-explorer-menu.component.scss']
})
export class ToolsExplorerMenuComponent implements OnInit {

  currentMenu;
  explorerMenus = {
    "Vector Analysis":[
      {
        "name":"Measurement",
        "functions":[
          {
            "title":"Along",
            "description":"Takes a LineString and returns a Point at a specified distance along the line."
          },
          {
            "title":"Area",
            "description":"Takes one or more features and returns their area in square meters."
          },
          {
            "title":"Bounding Box",
            "description":"Takes a set of features, calculates the bbox of all input features, and returns a bounding box."
          },
          {
            "title":"Bearing",
            "description":"Takes two points and finds the geographic bearing between them, i.e. the angle measured in degrees from the north line (0 degrees)"
          },
          {
            "title":"Center",
            "description":"Takes a Feature or FeatureCollection and returns the absolute center point of all features."
          },
          {
            "title":"Centroid",
            "description":"Takes one or more features and calculates the centroid using the mean of all vertices. This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons."
          },
          {
            "title":"Destination",
            "description":"Takes a Point and calculates the location of a destination point given a distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the Haversine formula to account for global curvature."
          },
          {
            "title":"Distance",
            "description":"Calculates the distance between two points in degrees, radians, miles, or kilometers. This uses the Haversine formula to account for global curvature."
          },
          {
            "title":"Length",
            "description":"Takes a GeoJSON and measures its length in the specified units, (Multi)Point 's distance are ignored.",
          },
          {
            "title":"Midpoint",
            "description":"Takes two points and returns a point midway between them. The midpoint is calculated geodesically, meaning the curvature of the earth is taken into account."
          },
          {
            "title":"Point To Line Distance",
            "description":"Returns the minimum distance between a Point and a LineString , being the distance from a line the minimum distance between the point and any segment of the LineString."
          },
          {
            "title":"Great Circle",
            "description":"Calculate great circles routes as LineString or MultiLineString. If the start and end points span the antimeridian, the resulting feature will be split into a MultiLineString ."
          }
        ]
      },
      {
        "name":"Transformation"
      },
      {
        "name":"Feature Conversion"
      },
      {
        "name":"Joins"
      },
      {
        "name":"Grids"
      },
      {
        "name":"Classification"
      },
      {
        "name":"Unit Conversion"
      },
      {
        "name":"Helpers & Misc"
      }
    ]
  }
  constructor(public events: EventPublisherService) { }

  ngOnInit() {
    this.events.getEvents("currentToolsExplorerMenu").subscribe(response => this.loadToolsExplorerMenu(JSON.parse(response)))
  }

  loadToolsExplorerMenu(menu){
    this.currentMenu = this.explorerMenus[menu.label]
    console.log(this.currentMenu)
  }

}
