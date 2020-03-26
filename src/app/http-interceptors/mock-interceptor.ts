import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';

// just do nothing
@Injectable()
export class MockInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqNew = req.clone({url: req.url.replace('https://rpi.xvv.be', host)});
    for (const element of urls) {
      if (req.url === element.url) {
        if (element.status) {
          console.log('Returning mock status : ' + element.status);
          return of(new HttpResponse({status: element.status}));
        } else {
          console.log('Loaded from json : ' + req.url);
          return of(new HttpResponse({status: 200, body: ((element.json) as any).default}));
        }
      }
    }
    console.log('Loaded from http call :' + req.url);
    return next.handle(reqNew);
  }

  constructor() {}
}

const host = 'http://11.230.0.2';
const urls = [
  {
    url: 'https://jsonplaceholder.typicode.com/users',
    json: []
  },
  {
    url: 'https://rpi.xvv.be/sensors/states/71',
    json: {
      'logs': [{
        'change_time': '2020-03-25 09:17:38',
        'state': '{"state":"off","temperature":24,"mode":"auto","fan":"auto","swing":"auto","turbo":"off"}'
      }, {
        'state': '{"state":"on","temperature":24,"mode":"auto","fan":"auto","swing":"auto","turbo":"off"}',
        'change_time': '2020-03-25 07:14:17'
      }, {
        'state': '{"state":"on","temperature":23,"mode":"auto","fan":"auto","swing":"auto","turbo":"off"}',
        'change_time': '2020-03-25 07:13:57'
      }, {
        'state': '{"state":"on","temperature":23,"mode":"auto","fan":"s3","swing":"auto","turbo":"off"}',
        'change_time': '2020-03-25 07:13:19'
      }, {
        'change_time': '2020-03-25 07:13:01',
        'state': '{"state":"off","temperature":24,"mode":"auto","fan":"s3","swing":"auto","turbo":"off"}'
      }, {
        'change_time': '2020-03-25 07:06:42',
        'state': '{"state":"off","temperature":23,"mode":"cool","fan":"s1","swing":"auto","turbo":"off"}'
      }, {
        'change_time': '2020-03-07 10:40:21',
        'state': '{"temperature":24,"swing":"auto","mode":"cool","turbo":"off","fan":"s1","state":"off"}'
      }, {
        'change_time': '2020-03-07 10:40:20',
        'state': '{"fan":"s1","state":"on","temperature":24,"swing":"auto","mode":"cool","turbo":"off"}'
      }, {
        'change_time': '2020-03-07 10:40:15',
        'state': '{"fan":"s1","state":"off","temperature":24,"swing":"auto","mode":"cool","turbo":"off"}'
      }, {
        'change_time': '2020-03-07 10:40:08',
        'state': '{"temperature":24,"mode":"cool","swing":"auto","fan":"s1","state":"on","turbo":"off"}'
      }],
      'name': 'Livingroom Air Conditioner',
      'state': '{"state":"off","temperature":24,"mode":"auto","fan":"auto","swing":"auto","turbo":"off"}',
      'group': 'air-conditioner',
      'sensor': 'livingroom/airConditioner',
      'type': 'mqtt',
      'sensor_id': 71,
      'normal_state': ''
    },
    status: null
  }
];
