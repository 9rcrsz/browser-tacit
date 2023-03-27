import { NgModule } from '@angular/core';

import { SelectColorComponent } from './select-color.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {  MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    SelectColorComponent
  ],
  exports: [
    SelectColorComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
  ],
  providers: [],
})
export class SelectColorModule {
}
