import {NgModule} from '@angular/core';
import {AllMaterialModules} from '../all-material-modules';
import {TimeAgo} from './pipes/utils.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';


@NgModule({
  declarations: [
    TimeAgo,
  ],
  exports: [
    TimeAgo,
    AllMaterialModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule,
  ],
  imports: [
    AllMaterialModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot()
  ]
})
export class SharedModule {}
