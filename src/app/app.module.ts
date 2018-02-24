import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FooterComponent} from "./footer/footer.component";
import {FooterDirective} from "./footer.directive";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    FooterDirective
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ])
  ],
    entryComponents:[FooterComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
