import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {NavigationActionTiming, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {reducers} from '@store/rootReducer';
import {SensorsEffects} from '@store/sensors/effects';
import {SensorsApiService} from '@api/sensors.api.service';
import {AuthEffects} from '@store/auth/effects';

@NgModule({
	imports: [
		EffectsModule.forRoot([SensorsEffects, AuthEffects]),
		StoreRouterConnectingModule.forRoot({
			navigationActionTiming: NavigationActionTiming.PostActivation,
		}),
		StoreModule.forRoot(reducers),
	],
	providers: [SensorsApiService],
})
export class AppStoreModule {}
