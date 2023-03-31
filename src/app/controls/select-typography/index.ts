import { NgModule } from '@angular/core';

import { SelectTypographyComponent } from './select-typography.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {  MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    SelectTypographyComponent
  ],
  exports: [
    SelectTypographyComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
  ],
  providers: [],
})
export class SelectTypographyModule {
}
