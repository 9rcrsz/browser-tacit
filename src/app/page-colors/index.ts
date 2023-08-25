import {NgModule} from '@angular/core';

import {PageColorsComponent} from './page-colors.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "src/app/controls/select-template";

@NgModule({
  declarations: [
    PageColorsComponent
  ],
  exports: [
    PageColorsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SelectTemplateModule
  ],
  providers: [],
})
export class PageColorsModel {
}
