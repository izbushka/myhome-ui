import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@myComponents/dashboard/dashboard.component';
import {SensorsListComponent} from '../../components/sensors-list/sensors-list.component';
import {SensorDetailsComponent} from '../../components/sensor-details/sensor-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list/:group', component: SensorsListComponent},
  { path: 'list', redirectTo: '/list/all', pathMatch: 'full' },
  { path: 'details/:id', component: SensorDetailsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
