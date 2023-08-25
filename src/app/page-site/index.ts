import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {PageSiteComponent} from "@src/app/page-site/page-site.component";
import {RouterLinkActive, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    PageSiteComponent
  ],
  exports: [
    PageSiteComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterOutlet,
    RouterLinkActive,
    MatButtonModule
  ],
  providers: [],
})
export class PageSiteModule {
}
