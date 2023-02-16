import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CssGroupModule} from "./css-group";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent
  ],
        imports: [
                BrowserModule,
                CssGroupModule,
                BrowserAnimationsModule,
                MatButtonModule
        ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
