import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import {ProductModule} from "../product/product.module";

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule
} from '@angular/material';
import 'hammerjs';

// Validatord
import { CustomFormsModule } from 'ng2-validation';



// Angushop Library module
import { libModule } from '../lib/lib.module';

import { ContactComponent } from './contact.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ProductModule,
        libModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        CustomFormsModule,
    ],
    declarations: [ 
        ContactComponent
    ],     
    exports: [ 
        ContactComponent
    ]
})
export class contactModule { }