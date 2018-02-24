import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {FooterComponent} from "./footer/footer.component";
import {FooterDirective} from "./footer.directive";
import {Home1Component} from "./home/home1/home1.component";
import {
    MatButtonModule, MatDialogModule, MatExpansionModule, MatIconModule, MatMenuModule,
    MatProgressSpinnerModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import {MatchHeightDirective} from "./lib/directive/match-height.directive";
import {FullscreenDirective} from "./lib/directive/fullscreen.directive";
import {SafeHtmlPipe} from "./lib/pipe/safe-html";
import {ShopCookieService} from "./lib/service/cookie.service";
import {HomeModule} from "./home/home.module";
import {CarouselComponent} from "./home/carousel/carousel.component";
import {AboutComponent} from "./home/about/about.component";
import {SeotextComponent} from "./home/seotext/seotext.component";
import {InstagramComponent} from "./home/instagram/instagram.component";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FooterDirective,
    MatchHeightDirective,
    FullscreenDirective,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
      MatDialogModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatExpansionModule,
      HttpClientModule,
      HomeModule,
      RouterModule.forRoot([
      { path: '', component: Home1Component, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ])
  ],
    entryComponents:[FooterComponent, CarouselComponent, AboutComponent, SeotextComponent, InstagramComponent, ],
  providers: [ShopCookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
