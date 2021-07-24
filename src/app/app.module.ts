import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppContainer} from './app.container';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppStoreModule} from '@store/app-store.module';
import {HttpClientModule} from '@angular/common/http';

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
	],
	providers: [],
	bootstrap: [AppContainer],
})
export class AppModule {}
