import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppContainer} from './app.container';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppStoreModule} from '@store/app-store.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {LeftMenuModule} from '@shared/components/left-menu/left-menu.module';
import {RpiHttpInterceptor} from '@shared/guards/rpi-http.interceptor';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
	declarations: [AppComponent, AppContainer],
	imports: [
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		MatSidenavModule,
		MatButtonModule,
		BrowserAnimationsModule,
		AppStoreModule,
		StoreDevtoolsModule.instrument(),
		NgxWebstorageModule.forRoot(),
		MatToolbarModule,
		MatIconModule,
		MatListModule,
		LeftMenuModule,
	],
	providers: [{provide: HTTP_INTERCEPTORS, useClass: RpiHttpInterceptor, multi: true}],
	bootstrap: [AppContainer],
})
export class AppModule {}
