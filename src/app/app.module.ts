import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppContainer} from './app.container';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppStoreModule} from '@store/app-store.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {LeftMenuModule} from '@shared/components/left-menu/left-menu.module';
import {RpiHttpInterceptor} from '@shared/guards/rpi-http.interceptor';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TopPanelModule} from '@shared/components/top-panel/top-panel.module';

@NgModule({
	declarations: [AppComponent, AppContainer],
	imports: [
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		MatSidenavModule,
		BrowserAnimationsModule,
		AppStoreModule,
		StoreDevtoolsModule.instrument(),
		NgxWebstorageModule.forRoot(),
		LeftMenuModule,
		TopPanelModule,
	],
	providers: [{provide: HTTP_INTERCEPTORS, useClass: RpiHttpInterceptor, multi: true}],
	bootstrap: [AppContainer],
})
export class AppModule {}
