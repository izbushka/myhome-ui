import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {SensorsListComponent} from '../../pages/sensors-list/sensors-list.component';
import {SensorDetailsComponent} from '../../pages/sensor-details/sensor-details.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'list/:group', component: SensorsListComponent},
  {path: 'list', redirectTo: '/list/all', pathMatch: 'full'},
  {path: 'details/:id', component: SensorDetailsComponent},
  {
    path: 'admin',
    loadChildren: () =>
       import('../../modules/administration/administration.module').then(m => m.AdministrationModule)
  },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
