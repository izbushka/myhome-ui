import {NgModule} from '@angular/core';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {SensorListPageComponent} from './sensor-list-page/sensor-list-page.component';
import {SensorDetailsPageComponent} from './sensor-details-page/sensor-details-page.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {GroupCardComponent} from './dashboard-page/group-card/group-card.component';
import {SensorCardComponent} from './sensor-list-page/sensor-card/sensor-card.component';
import {SearchButtonComponent} from './sensor-list-page/search-button/search-button.component';
import {AcControlComponent} from './shared/ac-control/ac-control.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardPageComponent,
    SensorListPageComponent,
    SensorDetailsPageComponent,
    GroupCardComponent,
    SensorCardComponent,
    SearchButtonComponent,
    AcControlComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    CommonModule,
    ChartsModule
  ]
})
export class HomeModule {}
