import { NgModule } from '@angular/core';

import { CssGroupComponent } from './css-group.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SelectTemplateModule } from "../select-template";
import { MatExpansionModule } from '@angular/material/expansion';
import { SelectColorModule } from '@app/controls/select-color';
import { SelectTypographyModule } from '@app/controls/select-typography';

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
    SelectTypographyModule
  ],
  providers: [],
})
export class CssGroupModule {
}
