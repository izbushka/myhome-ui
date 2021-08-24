import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {NavigationActionTiming, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {reducers} from '@store/rootReducer';
import {SensorsEffects} from '@store/sensors/effects';
import {SensorsApiService} from '@api/sensors.api.service';
import {AuthEffects} from '@store/auth/effects';
import {RouterEffects} from '@store/router/effects';
import {CommonEffects} from '@store/common/effects';
import {DbTablesEffects} from '@store/db-tables/effects';
import {AdministrationApiService} from '@api/administration.api.service';

const STORE_EFFECTS = [SensorsEffects, AuthEffects, RouterEffects, CommonEffects, DbTablesEffects];

@NgModule({
	imports: [
		EffectsModule.forRoot(STORE_EFFECTS),
		StoreRouterConnectingModule.forRoot({
			navigationActionTiming: NavigationActionTiming.PostActivation,
		}),
		StoreModule.forRoot(reducers),
	],
	providers: [SensorsApiService, AdministrationApiService],
})
export class AppStoreModule {}
