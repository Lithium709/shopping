import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {MatInputModule, MatButtonModule } from '@angular/material';



import { ActivateComponent } from './activate/activate.component';
import { RememberComponent } from './remember/remember.component';
import { PaswordResetComponent } from './pasword-reset/pasword-reset.component';

@NgModule({
  imports: [
      BrowserModule, FormsModule, HttpClientModule, RouterModule, MatInputModule, MatButtonModule
  ],
  declarations: [
        ActivateComponent, RememberComponent, PaswordResetComponent
  ],
    exports: [
        ActivateComponent, RememberComponent
    ]
})
export class AutformsModule { }
