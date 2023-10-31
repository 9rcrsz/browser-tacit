import {NgModule} from '@angular/core';

import {SelectDisplayComponent} from './select-display.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    SelectDisplayComponent
  ],
  exports: [
    SelectDisplayComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
  ],
  providers: [],
})
export class SelectDisplayModule {
}
