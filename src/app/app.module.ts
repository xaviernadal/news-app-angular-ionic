import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularDelegate, IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';

// other imports here...

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';


// imports...

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({ // <--- add this
      loader: { // <--- add this 
        provide: TranslateLoader, // <--- add this
        useFactory: (createTranslateLoader),  // <--- add this
        deps: [HttpClient] // <--- add this
      } // <--- add this
    }) // <--- add this
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser, SocialSharing],
  bootstrap: [AppComponent],
})
export class AppModule { }
