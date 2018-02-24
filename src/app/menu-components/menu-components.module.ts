import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { libModule } from '../lib/lib.module';
import { RouterModule } from '@angular/router';

// Service
import {productService} from "../lib/service/product.service";

//Menu-Components
import { NewsComponent } from './news/news.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ShopsComponent } from './shops/shops.component';
import { ServicesComponent } from './services/services.component';


@NgModule({
  imports: [
    libModule,
    CommonModule,
    RouterModule
  ],

  declarations: [
      NewsComponent,
      CatalogComponent,
      ShopsComponent,
      ServicesComponent
  ],
  exports:[
      NewsComponent,
      CatalogComponent,
      ShopsComponent,
      ServicesComponent
  ]
})
export class MenuComponentsModule { }
