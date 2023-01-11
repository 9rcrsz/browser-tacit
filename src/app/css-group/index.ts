import {NgModule} from '@angular/core';

import {CssGroupComponent} from './css-group.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    CssGroupComponent
  ],
  exports: [
    CssGroupComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [],
})
export class CssGroupModule {
}
