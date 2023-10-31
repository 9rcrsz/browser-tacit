import {NgModule} from '@angular/core';

import {CssGroupComponent} from './css-group.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "@src/app/controls/select-template";
import {MatExpansionModule} from '@angular/material/expansion';
import {SelectColorModule} from '@src/app/controls/select-color';
import {SelectTypographyModule} from '@src/app/controls/select-typography';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SelectJustifyContentModule} from '@src/app/controls/select-justify-content';
import {SelectDisplayModule} from '@src/app/controls/select-display';
import {SelectFlexDirectionModule} from '@src/app/controls/select-flex-direction';

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
    SelectTemplateModule,
    MatExpansionModule,
    SelectColorModule,
    SelectJustifyContentModule,
    SelectTypographyModule,
    MatProgressBarModule,
    SelectDisplayModule,
    SelectFlexDirectionModule
  ],
  providers: [],
})
export class CssGroupModule {
}
