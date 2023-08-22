import {NgModule} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "../select-template";
import {MatExpansionModule} from '@angular/material/expansion';
import {SelectColorModule} from '@app/controls/select-color';
import {CssGroupModule} from "@app/css-group";
import {MatButtonModule} from "@angular/material/button";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {PageContainerComponent} from "@app/page-container/page-container.component";

@NgModule({
  declarations: [
    PageContainerComponent
  ],
  exports: [
    PageContainerComponent
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
    CssGroupModule,
    MatButtonModule,
    RouterLinkWithHref,
    RouterOutlet
  ],
  providers: [],
})
export class PageContainer {
}
