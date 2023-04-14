import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule } from './services/storage.service';
import { AppUpdateService } from './services/app-update.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AvatarIconComponent } from './components/icons/avatar/avatar.component';
import { LogoComponent } from './components/icons/logo/logo.component';
import { LoremIpsumComponent } from './components/lorem-ipsum/lorem-ipsum.component';
import { WindowRef } from './WindowRef';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AvatarIconComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    LogoComponent,
    LoremIpsumComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    WindowRef,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
