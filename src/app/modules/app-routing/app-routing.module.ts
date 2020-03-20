import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@myComponents/dashboard/dashboard.component';
import { SensorsGroupComponent } from '@myComponents/sensors-group/sensors-group.component';
import { MainLayoutComponent } from '@myComponents/main-layout/main-layout.component';

const routes: Routes = [
  { path: 'home', component: MainLayoutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'test', component: SensorsGroupComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
