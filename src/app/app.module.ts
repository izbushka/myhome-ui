import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from '@myModules/app-routing/app-routing.module';
import { DashboardComponent } from '@myComponents/dashboard/dashboard.component';
import { MainLayoutComponent } from '@myComponents/main-layout/main-layout.component';
import { SensorsGroupSummaryComponent } from '@myComponents/sensors-group-summary/sensors-group-summary.component';

import { AllMaterialModules } from './all-material-modules';
import { SensorsListComponent } from './components/sensors-list/sensors-list.component';
import { SensorsListItemComponent } from './components/sensors-list-item/sensors-list-item.component';

import { TimeAgo } from './modules/utils.pipe';
import { SensorDetailsComponent } from './components/sensor-details/sensor-details.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainLayoutComponent,
    SensorsGroupSummaryComponent,
    SensorsListComponent,
    SensorsListItemComponent,
    TimeAgo,
    SensorDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AllMaterialModules,
    // MatSliderModule,
    // MatToolbarModule,
    // MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
