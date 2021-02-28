import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorAlongComponent } from './vector-along/vector-along.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    VectorAlongComponent
  ],
  declarations: [VectorAlongComponent]
})
export class AlgorithmsModule { }
