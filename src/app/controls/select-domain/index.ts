import {NgModule} from '@angular/core';

import {SelectDomainComponent} from './select-domain.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";

@NgModule({
  declarations: [
    SelectDomainComponent
  ],
  exports: [
    SelectDomainComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  providers: [],
})
export class SelectDomainModule {
}
