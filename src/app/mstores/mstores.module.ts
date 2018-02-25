import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import {StoresComponent} from './stores/stores.component';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AgmCoreModule.forRoot({
              apiKey: 'AIzaSyBUFx_CneKBEtMIP76b7LR-lQRPIhpTt-Y'
        })
  ],
  declarations: [StoreDetailComponent, StoresComponent]
})
export class MstoresModule { }
