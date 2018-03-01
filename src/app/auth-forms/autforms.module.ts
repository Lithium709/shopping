import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



import { ActivateComponent } from './activate/activate.component';
import { RememberComponent } from './remember/remember.component';

@NgModule({
  imports: [
      BrowserModule, FormsModule, HttpClientModule, RouterModule
  ],
  declarations: [
        ActivateComponent, RememberComponent
  ],
    exports: [
        ActivateComponent, RememberComponent
    ]
})
export class AutformsModule { }
