import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@store/rootReducer';
import {AuthSelectors} from '@store/auth/selectors';
import {catchError} from 'rxjs/operators';
import {AuthActions} from '@store/auth/actions';

@Injectable()
export class RpiHttpInterceptor implements HttpInterceptor {
	private authorized = false;
	private token: string;
	private error401 = {
		error: 'Unauthorized',
		status: 401,
		statusText: 'Unauthorized',
	};

	constructor(private store: Store<AppState>) {
		this.store.select(AuthSelectors.isAuthorized).subscribe((data) => {
			this.authorized = data;
		});
		this.store.select(AuthSelectors.token).subscribe((token) => {
			this.token = token;
		});
	}

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!this.authorized) {
			this.store.dispatch(AuthActions.unAuthorize({}));
			throw new HttpErrorResponse(this.error401);
		}
		const reqNew = !this.token
			? request
			: request.clone({
					setHeaders: {
						// eslint-disable-next-line @typescript-eslint/naming-convention
						Authorization: `Basic ${this.token}`,
					},
			  });

		return next.handle(reqNew).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 403 || error.status === 401) {
					this.store.dispatch(AuthActions.unAuthorize({}));
					throw new HttpErrorResponse(this.error401);
				}
				return throwError(error);
			})
		);
	}
}
