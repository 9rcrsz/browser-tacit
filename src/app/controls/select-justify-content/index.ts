import { NgModule } from '@angular/core';

import { SelectJustifyContentComponent } from './select-justify-content.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {  MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    SelectJustifyContentComponent
  ],
  exports: [
    SelectJustifyContentComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
  ],
  providers: [],
})
export class SelectJustifyContentModule {
}
