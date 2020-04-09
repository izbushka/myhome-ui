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

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthComponent,
    HomeComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    httpInterceptorProviders,
    {provide: APP_BASE_HREF, useValue: environment.appBase}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

