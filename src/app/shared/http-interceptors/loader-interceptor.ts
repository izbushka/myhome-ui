import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoaderService} from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loaderTimeout = setTimeout(() => {
            this.loaderService.show();
        }, 1000);

        return next.handle(req).pipe(
            finalize(() => {
                clearTimeout(loaderTimeout);
                this.loaderService.hide();
            })
        );
    }

    constructor(private loaderService: LoaderService) {}
}
