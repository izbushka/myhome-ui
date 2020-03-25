import { Injectable } from '@angular/core';
import {Subject, timer} from 'rxjs';
import {delay, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading: Subject<boolean> = new Subject();

  constructor() { }
  show() {
    console.debug('Show loader');
    this.isLoading.next(true);
  }
  hide() {
    console.debug('HIDE loader');
    this.isLoading.next(false);
  }
}
