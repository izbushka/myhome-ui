import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {SensorsActions} from '@store/sensors/actions';
import {SensorsApiService} from '@api/sensors.api.service';
import {AppState} from '@store/rootReducer';
import {of} from 'rxjs';

@Injectable()
export class SensorsEffects {
	getSensors$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SensorsActions.getSensors.requested),
			switchMap(() =>
				this.sensorsApiService.getSensors().pipe(
					map((payload) => SensorsActions.getSensors.succeeded({payload})),
					catchError((error: string) => of(SensorsActions.getSensors.failed({error: `${error}`})))
				)
			)
		)
	);

	public constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private sensorsApiService: SensorsApiService
	) {}
}
