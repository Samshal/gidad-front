import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { pgSelectModule} from '../@pages/components/select/select.module';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { VectorAlongComponent } from './vector-along/vector-along.component';
import { VectorAreaComponent } from './vector-area/vector-area.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    pgSelectModule,
    LeafletModule
  ],
  exports:[
    VectorAlongComponent,
    VectorAreaComponent
  ],
  declarations: [VectorAlongComponent, VectorAreaComponent]
})
export class AlgorithmsModule { }
