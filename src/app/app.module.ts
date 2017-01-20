import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpModule} from "@angular/http";
import { FormsModule }   from '@angular/forms';

import {AppRoutingModule} from "./app-routing.module";
import {FrontPageComponent} from "./front-page/front-page.component";
import {ViewerComponent} from "./viewer/viewer.component";
import {ModelerComponent} from "./modeler/modeler.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        FrontPageComponent,
        ViewerComponent,
        ModelerComponent,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
