import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewerComponent} from "./viewer/viewer.component";
import {FrontPageComponent} from "./front-page/front-page.component";
import {ModelerComponent} from "./modeler/modeler.component";
const routes: Routes = [
    { path: '', redirectTo: '/front-page', pathMatch: 'full' },
    { path: 'front-page',  component: FrontPageComponent },
    { path: 'viewer',  component: ViewerComponent },
    { path: 'modeler',  component: ModelerComponent },
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}