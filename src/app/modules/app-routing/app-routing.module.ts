import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@myComponents/dashboard/dashboard.component';
import {SensorsListComponent} from '../../components/sensors-list/sensors-list.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: SensorsListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
