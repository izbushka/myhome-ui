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
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }
}
