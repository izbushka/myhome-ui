
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
// import {LoaderService} from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('intercepting');
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        console.debug(data);
        // alert('Error00');

        return throwError(error);
      })
    );
  }

  constructor() {}
}
