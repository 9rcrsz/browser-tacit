import {NgModule} from '@angular/core';

import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "src/app/controls/select-template";
import {MatExpansionModule} from '@angular/material/expansion';
import {SelectColorModule} from '@src/app/controls/select-color';
import {PageSiteComponent} from "@src/app/page-site/page-site.component";
import {CssGroupModule} from "src/app/page-site/css-group";
import {MatButtonModule} from "@angular/material/button";
import {RouterLinkActive, RouterLinkWithHref, RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    PageSiteComponent
  ],
  exports: [
    PageSiteComponent
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
    RouterOutlet,
    RouterLinkActive
  ],
  providers: [],
})
export class PageSiteModule {
}