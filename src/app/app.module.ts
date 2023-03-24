import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CssGroupModule } from "./css-group";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { SelectTemplateModule } from "./select-template";
import { ColorsGroupModel } from "./colors-group";
import { MatExpansionModule } from "@angular/material/expansion";
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CssGroupModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    SelectTemplateModule,
    ColorsGroupModel,
    MatExpansionModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
