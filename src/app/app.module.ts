import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppContainer} from './app.container';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
	declarations: [AppComponent, AppContainer],
	imports: [BrowserModule, AppRoutingModule, MatSidenavModule, MatButtonModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppContainer],
})
export class AppModule {}
