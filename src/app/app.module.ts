import { BrowserModule } from '@angular/platform-browser';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './routing.module';

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

import {ProductModule} from "./product/product.module";

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
import { REQUEST } from '@nguniversal/express-engine/tokens';

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
      BrowserCookiesModule.forRoot(),
      MatDialogModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatExpansionModule,
      HttpClientModule,
      ProductModule,
      RouterModule,
      AppRoutingModule,
      HomeModule,
      MenuComponentsModule
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
       // REQUEST,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
