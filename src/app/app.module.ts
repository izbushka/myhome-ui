import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@myModules/app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from '@myComponents/dashboard/dashboard.component';
import { SensorsGroupComponent } from './components/sensors-group/sensors-group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

import { AllMaterialModules } from './all-material-modules';

// import { MatSliderModule } from '@angular/material/slider';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SensorsGroupComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MatSliderModule,
    // MatToolbarModule,
    // MatIconModule,
    AllMaterialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
