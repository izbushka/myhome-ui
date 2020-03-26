/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {LoaderInterceptor} from './loader-interceptor';
import {AuthInterceptor} from './auth-interceptor';
import {environment} from '../../environments/environment';
import {MockInterceptor} from './mock-interceptor';
import {NoopInterceptor} from './noop-interceptor';

const isMock = environment.hasOwnProperty('mockHttp');
/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: isMock ? MockInterceptor : NoopInterceptor, multi: true},
];
