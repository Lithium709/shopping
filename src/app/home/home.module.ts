import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Component
import { Home1Component } from './home1/home1.component';
//import { Home2Component } from './home2/home2.component';
//import { HomeslideDirective } from './home2/home-slide.directive';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
} from '@angular/material';

// import 'hammerjs';

// Anguushop Lib
import { libModule } from '../lib/lib.module';
import { CarouselComponent } from './carousel/carousel.component';
import { BlogAnnonceComponent } from './blog-annonce/blog-annonce.component';
import { AboutComponent } from './about/about.component';
import { SeotextComponent } from './seotext/seotext.component';
import { InstagramComponent } from './instagram/instagram.component';
import {CarouselDirective} from "./home1/carousel.directive";
import {AboutDirective} from "./home1/about.directive";
import {SeotextDirective} from "./home1/seotext.directive";
import {InstagramDirective} from "./home1/instagram.directive";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    libModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    Home1Component, 
   // Home2Component,
   // HomeslideDirective,
    CarouselComponent,
    CarouselDirective,
    BlogAnnonceComponent,
    AboutComponent,
    AboutDirective,
    SeotextComponent,
    SeotextDirective,
    InstagramComponent,
    InstagramDirective
  ],
  exports: [Home1Component,
    // Home2Component
  ]
})
export class HomeModule { }
