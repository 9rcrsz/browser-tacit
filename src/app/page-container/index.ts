import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectTemplateModule} from "src/app/controls/select-template";
import {MatExpansionModule} from '@angular/material/expansion';
import {SelectColorModule} from '@src/app/controls/select-color';
import {CssGroupModule} from "src/app/page-container/css-group";
import {MatButtonModule} from "@angular/material/button";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {PageContainerComponent} from "@src/app/page-container/page-container.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatProgressBarModule} from '@angular/material/progress-bar';

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
        RouterOutlet,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ],
  providers: [],
})
export class PageContainer {
}
