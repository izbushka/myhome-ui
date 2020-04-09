import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
       import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
       import('./administration/administration.module').then(m => m.AdministrationModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
