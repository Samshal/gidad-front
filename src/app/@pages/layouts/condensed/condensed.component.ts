import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit,Input,ViewEncapsulation } from '@angular/core';
import { RootLayout } from '../root/root.component';

import { pagesToggleService } from '../../services/toggler.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { EventPublisherService } from '../../../event-publisher.service';

@Component({
  selector: 'condensed-layout',
  templateUrl: './condensed.component.html',
  styleUrls: ['./condensed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CondensedComponent extends RootLayout implements OnInit {
    menuLinks = [
      {
        label:"Analysis",
        iconType:"pg",
        iconName:"charts",
        toggle:"close",
        submenu:[
          {
            label:"Raster Analysis",
            routerLink:"/",
            iconType:"pg",
            iconName:"image",
          },
          {
            label:"Vector Analysis",
            routerLink:"/",
            iconType:"pg",
            iconName:"map",
          }
        ]
      },
      {
        label:"Detection",
        iconType:"pg",
        iconName:"search",
        toggle:"close",
        submenu:[
          {
            label:"Change Detection",
            routerLink:"/",
            iconType:"pg",
            iconName:"crop",
          },
          {
            label:"Object Detection",
            routerLink:"/",
            iconType:"pg",
            iconName:"camera",
          }
        ]
      },
      {
          label:"Data Fusion",
          externalLink:"cards",
          iconType:"fa",
          iconName:"database"
      },
      {
        label:"Map Studio",
        iconType:"pg",
        iconName:"layouts2",
        toggle:"close",
        submenu:[
          {
            label:"Annotation Tools",
            routerLink:"/",
            iconType:"fa",
            iconName:"pencil-square-o",
          },
          {
            label:"Map Styles",
            routerLink:"/",
            iconType:"fa",
            iconName:"paint-brush",
          }
        ]
    },
    {
      label:"Reports",
      iconType:"pg",
      iconName:"form",
      toggle:"close",
      submenu:[
        {
          label:"Report Creator",
          routerLink:"/",
          iconType:"fa",
          iconName:"book",
        },
        {
          label:"Report Browser",
          routerLink:"/",
          iconType:"fa",
          iconName:"search-plus",
        }
      ]
    }
  ];

    showToolsExplorerMenu: boolean = false;
    currentToolsExplorerMenu;
    constructor(public toggler: pagesToggleService, router: Router, public events: EventPublisherService){
      super(toggler, router)
    }
    ngOnInit() {
      this.events.getEvents("currentToolsExplorerMenu").subscribe(response => this.enableToolsExplorerMenu(JSON.parse(response)))
    }

    toggleToolsExplorerMenu() {
      this.showToolsExplorerMenu = !this.showToolsExplorerMenu
    }

    setToolsExplorerMenu(menu){
      this.events.publishEvent("currentToolsExplorerMenu", JSON.stringify(menu));
    }

    enableToolsExplorerMenu(menu){
      this.currentToolsExplorerMenu = menu;
      this.showToolsExplorerMenu = true;
    }
}
