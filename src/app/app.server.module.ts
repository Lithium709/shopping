import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {FooterComponent} from "./footer/footer.component";
import {FooterDirective} from "./footer.directive";
import {
    MatButtonModule, MatDialogModule, MatExpansionModule, MatIconModule, MatMenuModule,
    MatProgressSpinnerModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
      HttpClientModule,
      AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent]
})
export class AppServerModule {}
