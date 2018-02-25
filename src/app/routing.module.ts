import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Home
import { Home1Component } from './home/home1/home1.component';

// Products
import { DashboardProdut } from './product/dashboard/dashboard.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { product1Component } from './product/product1/product1.component';
//import { Product2Component } from './product/product2/product2.component';
//import { Product3Component } from './product/product3/product3.component';
//import { Product4Component } from './product/product4/product4.component';
//import { Product5Component } from './product/product5/product5.component';
import { CartComponent } from './product/cart/cart.component';
import { ShippingComponent } from './product/shipping/shipping.component';

import { ReceiptComponent } from './product/receipt/receipt.component';
import { WishlistComponent } from './product/wishlist/wishlist.component';

import { OpenorderComponent} from "./cabinet/openorder/openorder.component";
import { OrderListComponent } from "./cabinet/order-list/order-list.component";
import {ReturdetaleComponent} from "./cabinet/returdetale/returdetale.component";
import {ReturnlistComponent} from "./cabinet/returnlist/returnlist.component";
import {PersoninfoComponent} from "./cabinet/personinfo/personinfo.component";
import {PersonSettingsComponent} from "./cabinet/person-settings/person-settings.component";


import {NavblogComponent} from "./mblog/navblog/navblog.component";
import { BlogComponent } from "./blog/blog.component";
// ELements


const routes: Routes = [
    // { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '',  component: Home1Component, pathMatch: 'full' },
    { path: 'catalog', component: product1Component},
    { path: 'shipping', component: OpenorderComponent },
    { path: 'product',  component: DashboardProdut,
        children : [
            { path: ':detail', component: DetailProductComponent },
            { path: 'cart', component: CartComponent },

            { path: 'receipt', component: ReceiptComponent },
            { path: 'wishlist',  component: WishlistComponent }
        ]},
    /*
    { path: 'shop',  component: DashboardProdut,
      children : [
        { path: '', redirectTo: '/catalog', pathMatch: 'full'  },
        { path: 'product1', component: product1Component },
       // { path: 'product2', component: Product2Component },
       // { path: 'product3', component: Product3Component },
        //{ path: 'product4', component: Product4Component },
      // { path: 'product5', component: Product5Component },
        { path: 'cart', component: CartComponent },
        { path: 'shipping', component: OpenorderComponent },
        { path: 'receipt', component: ReceiptComponent },
        { path: 'wishlist',  component: WishlistComponent },            
        { path: 'compare',  component: CompareComponent },            
        { path: 'p/:detail', component: DetailProductComponent }
      ]  
    },
    */
    { path: 'order-list', component: OrderListComponent},
    { path: 'returnorder', component: ReturdetaleComponent},
    { path: 'returnlist', component: ReturnlistComponent},
    { path: 'me', component: PersoninfoComponent},
    { path: 'cabinet/setings', component: PersonSettingsComponent},

    { path: 'blog/:title', component: BlogComponent},
    { path: 'blog-posts', component: NavblogComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}