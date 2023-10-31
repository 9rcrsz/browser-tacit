import {NgModule} from '@angular/core';

import {SelectFlexDirectionComponent} from './select-flex-direction.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    SelectFlexDirectionComponent
  ],
  exports: [
    SelectFlexDirectionComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
  ],
  providers: [],
})
export class SelectFlexDirectionModule {
}
