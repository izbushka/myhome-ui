import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';

import {httpInterceptorProviders} from './shared/http-interceptors';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {environment} from '../environments/environment';
import {AuthComponent} from './shared/components/popups/auth/auth.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from './shared/shared.module';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {ServiceWorkerModule} from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthComponent,
    HomeComponent,
    LoaderComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // https://github.com/angular/angular-cli/issues/13351#issuecomment-516342267
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    httpInterceptorProviders,
    {provide: APP_BASE_HREF, useValue: environment.appBase}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

