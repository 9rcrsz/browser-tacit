import {NgModule} from '@angular/core';

import {CssGroupComponent} from './css-group.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "../select-template";

@NgModule({
  declarations: [
    CssGroupComponent
  ],
  exports: [
    CssGroupComponent
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
export class CssGroupModule {
}
