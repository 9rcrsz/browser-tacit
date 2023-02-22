import {NgModule} from '@angular/core';

import {SelectTemplateComponent} from './select-template.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";

@NgModule({
  declarations: [
    SelectTemplateComponent
  ],
  exports: [
    SelectTemplateComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  providers: [],
})
export class SelectTemplateModule {
}
