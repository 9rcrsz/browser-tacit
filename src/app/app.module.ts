import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CssGroupModule} from "./css-group";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {SelectTemplateModule} from "./select-template";
import {PageColorsModel} from "./page-colors";
import {MatExpansionModule} from "@angular/material/expansion";
import {environment} from '../environments/environment';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {PageTypographyModule} from '@app/page-typography';
import {AppRoutingModule} from "@app/app-routing.module";
import {PageSiteModule} from "@app/page-site";
import {PageContainer} from "@app/page-container";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CssGroupModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    SelectTemplateModule,
    PageColorsModel,
    PageTypographyModule,
    PageSiteModule,
    PageContainer,
    MatExpansionModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
