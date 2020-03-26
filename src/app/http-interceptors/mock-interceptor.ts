
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';

// just do nothing
@Injectable()
export class MockInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {
      if (req.url === element.url) {
        console.log('Loaded from json : ' + req.url);
        return of(new HttpResponse({ status: 200, body: ((element.json) as any).default }));
      }
    }
    console.log('Loaded from http call :' + req.url);
    return next.handle(req);
  }

  constructor() {}
}

const urls = [
  {
    url: 'https://jsonplaceholder.typicode.com/users',
    json: []
  }
];
