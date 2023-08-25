import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CssGroupModule} from "./page-container/css-group";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {SelectTemplateModule} from "./controls/select-template";
import {PageColorsModel} from "./page-colors";
import {environment} from '@src/environments/environment';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {PageTypographyModule} from '@src/app/page-typography';
import {AppRoutingModule} from "@src/app/app-routing.module";
import {PageSiteModule} from "@src/app/page-site";
import {PageContainer} from "@src/app/page-container";

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
    environment.production ? [] : AkitaNgDevtools.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
