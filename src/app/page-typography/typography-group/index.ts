import {NgModule} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "@src/app/controls/select-template";
import {MatExpansionModule} from '@angular/material/expansion';
import {SelectColorModule} from '@src/app/controls/select-color';
import {TypographyGroupComponent} from './typography-group.component';

@NgModule({
  declarations: [
    TypographyGroupComponent
  ],
  exports: [
    TypographyGroupComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    SelectTemplateModule,
    MatExpansionModule,
    SelectColorModule
  ],
  providers: [],
})
export class TypographyGroupModule {
}
