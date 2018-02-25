import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { ProductModule } from "../product/product.module";

// Component
import { OrderListComponent } from './order-list/order-list.component';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatIconModule,
    MatProgressSpinnerModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule
} from '@angular/material';

/*import {ExpansionPanelsModule} from "ng2-expansion-panels/dist/modules/ng2-expansion-panels.module";*/
import 'hammerjs';
import { OpenorderComponent } from './openorder/openorder.component';
import { CabmenuComponent } from './cabmenu/cabmenu.component';
import { ReturdetaleComponent } from './returdetale/returdetale.component';
import { ReturnlistComponent } from './returnlist/returnlist.component';
import { PersoninfoComponent } from './personinfo/personinfo.component';
import { PersonSettingsComponent } from './person-settings/person-settings.component';


@NgModule({
  imports: [
      BrowserModule,
      ProductModule,
      BrowserAnimationsModule,
      MatProgressSpinnerModule,
      MatInputModule,
      MatSnackBarModule,
      MatIconModule,
      MatButtonModule,
      FormsModule,
      HttpClientModule,
     /* ExpansionPanelsModule, */
      RouterModule,
    CommonModule
  ],
  declarations: [OrderListComponent, OpenorderComponent, CabmenuComponent, ReturdetaleComponent, ReturnlistComponent, PersoninfoComponent, PersonSettingsComponent],
    exports: [OrderListComponent]
})
export class CabinetModule { }
