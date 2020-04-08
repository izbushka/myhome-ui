import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministrationRoutingModule} from './administration-routing.module';
import {AdministrationHomeComponent} from './pages/administration-home/administration-home.component';
import {AdministrationTablesComponent} from './pages/administration-tables/administration-tables.component';
import {AdministrationComponent} from './administration.component';
import {AdministrationLoginComponent} from './pages/administration-login/administration-login.component';
import {DataTableComponent} from './components/data-table/data-table.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    AdministrationHomeComponent,
    AdministrationTablesComponent,
    AdministrationComponent,
    AdministrationLoginComponent,
    DataTableComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AdministrationRoutingModule,
  ],
  exports: []
})
export class AdministrationModule {}
