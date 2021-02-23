import { Routes } from '@angular/router';
//Layouts
import { 
  CondensedComponent
} from './@pages/layouts';

import { MapWorkspaceComponent } from './map-workspace/map-workspace.component';

export const AppRoutes: Routes = [

  {
    path: '',
    data: {
        breadcrumb: 'Home'
    },
    component: CondensedComponent,
    children: [{
      path: '',
      component: MapWorkspaceComponent
    }]
  }
];
