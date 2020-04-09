import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {SensorListPageComponent} from './sensor-list-page/sensor-list-page.component';
import {SensorDetailsPageComponent} from './sensor-details-page/sensor-details-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';


const HomeRoutes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: 'dashboard', component: DashboardPageComponent},
      {path: 'sensors', redirectTo: 'sensors/all', pathMatch: 'full'},
      {path: 'sensors/:group', component: SensorListPageComponent},
      {path: 'sensor/:id', component: SensorDetailsPageComponent},
      {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(HomeRoutes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
