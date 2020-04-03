import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SensorsGroupSummaryComponent } from './components/sensors-group-summary/sensors-group-summary.component';

import { AllMaterialModules } from './all-material-modules';
import { SensorsListComponent } from './pages/sensors-list/sensors-list.component';
import { SensorsListItemComponent } from './components/sensors-list-item/sensors-list-item.component';


import { TimeAgo } from './modules/utils.pipe';
import { SensorDetailsComponent } from './pages/sensor-details/sensor-details.component';

import { ChartsModule } from 'ng2-charts';
import { AcControlComponent } from './components/popups/ac-control/ac-control.component';
import {httpInterceptorProviders} from './http-interceptors';
import { LoaderComponent } from './components/loader/loader.component';
import {APP_BASE_HREF} from '@angular/common';
import {environment} from '../environments/environment';
import {AuthComponent} from './components/popups/auth/auth.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { SearchButtonComponent } from './components/search-button/search-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainLayoutComponent,
    SensorsGroupSummaryComponent,
    SensorsListComponent,
    SensorsListItemComponent,
    TimeAgo,
    SensorDetailsComponent,
    AcControlComponent,
    LoaderComponent,
    AuthComponent,
    SearchButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AllMaterialModules,
    NgxWebstorageModule.forRoot(),
    // MatSliderModule,
    // MatToolbarModule,
    // MatIconModule,
    ChartsModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: APP_BASE_HREF, useValue: environment.appBase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
