import {NgModule} from '@angular/core';

import {PageAssetsComponent} from './page-assets.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "src/app/controls/select-template";
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    PageAssetsComponent
  ],
  exports: [
    PageAssetsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SelectTemplateModule,
    MatButtonModule
  ],
  providers: [],
})
export class PageAssetsModule {
}
