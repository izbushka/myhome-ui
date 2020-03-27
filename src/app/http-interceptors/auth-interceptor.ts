import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
// import {AppRoutingModule} from '../modules/app-routing/app-routing.module';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (!this.authService.hasToken()) {
          return of(null);
      }
      const reqNew = req.clone({
          setHeaders: {
              Authorization: this.authService.getAuthHeader()
          }
      });

      return next.handle(reqNew).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.status === 403 || error.status === 401 || error.status === 0) {
                  this.authService.authorized(false);
				  return of(null);
              }
              return throwError(error);
          })
    );
  }

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }
}
