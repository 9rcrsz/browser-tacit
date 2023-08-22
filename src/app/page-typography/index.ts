import {NgModule} from '@angular/core';

import {PageTypographyComponent} from './page-typography.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "../select-template";
import {TypographyGroupModule} from "@app/typography-group";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    PageTypographyComponent
  ],
  exports: [
    PageTypographyComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SelectTemplateModule,
    TypographyGroupModule,
    MatExpansionModule
  ],
  providers: [],
})
export class PageTypographyModule {
}
