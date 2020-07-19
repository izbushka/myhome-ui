import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministrationComponent} from './administration.component';
import {AdministrationHomeComponent} from './pages/administration-home/administration-home.component';
import {AdministrationTablesComponent} from './pages/administration-tables/administration-tables.component';
import {AuthGuard} from './guards/auth.guard';
import {AdministrationLoginComponent} from './pages/administration-login/administration-login.component';


const AdminRoutes: Routes = [
  {
    path: '', component: AdministrationComponent, children: [
      {
        // component-less route - to manager routes under auth
        path: '', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
          {path: 'home', component: AdministrationHomeComponent},
          {path: 'tables', component: AdministrationTablesComponent},
          {path: '', redirectTo: 'tables', pathMatch: 'full'},
          {path: '**', redirectTo: 'login', pathMatch: 'full'},
        ]
      },
      {path: 'login', component: AdministrationLoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
