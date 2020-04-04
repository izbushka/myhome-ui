import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministrationRoutingModule} from './administration-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdministrationHomeComponent} from './pages/administration-home/administration-home.component';
import {AdministrationTablesComponent} from './pages/administration-tables/administration-tables.component';
import {AdministrationComponent} from './administration.component';
import {AdministrationLoginComponent} from './pages/administration-login/administration-login.component';
import {AllMaterialModules} from '../../all-material-modules';
import { DataTableComponent } from './components/data-table/data-table.component';


@NgModule({
  declarations: [
    AdministrationHomeComponent,
    AdministrationTablesComponent,
    AdministrationComponent,
    AdministrationLoginComponent,
    DataTableComponent
  ],
  imports: [
    AllMaterialModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
  ],
  exports: []
})
export class AdministrationModule {}
