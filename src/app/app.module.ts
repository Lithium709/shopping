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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatchHeightDirective} from "./lib/directive/match-height.directive";
import {FullscreenDirective} from "./lib/directive/fullscreen.directive";
import {SafeHtmlPipe} from "./lib/pipe/safe-html";
import {ShopCookieService} from "./lib/service/cookie.service";
import {HomeModule} from "./home/home.module";
import {CarouselComponent} from "./home/carousel/carousel.component";
import {AboutComponent} from "./home/about/about.component";
import {SeotextComponent} from "./home/seotext/seotext.component";
import {InstagramComponent} from "./home/instagram/instagram.component";
import {MenuComponentsModule} from "./menu-components/menu-components.module";
import {MenuComponent} from "./menu/menu.component";
import {CookieService} from "ng2-cookies";
import {AuthInterceptor} from "./auth/auth-interceptor";
import {Register} from "./auth/register.service";
import {SocialService} from "./social/social.service";
import {CSRFService} from "./auth/csrf.service";
import {LocalStorageService, SessionStorageService} from "ng2-webstorage";
import {AuthServerProvider} from "./auth/auth-jwt.service";
import {StateStorageService} from "./auth/state-storage.service";
import {Principal} from "./auth/principal.service";
import {AccountService} from "./auth/account.service";
import {LogisticService} from "./lib/service/logistic.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
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
      MenuComponentsModule,
      RouterModule.forRoot([
      { path: '', component: Home1Component, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ])
  ],
    entryComponents:[FooterComponent, CarouselComponent, AboutComponent, SeotextComponent, InstagramComponent, ],
    providers: [
        ShopCookieService,
        Principal, AccountService, LogisticService,
        StateStorageService,
        AuthServerProvider,
        LocalStorageService,
        SessionStorageService,
        CSRFService,
        SocialService,
        Register,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
