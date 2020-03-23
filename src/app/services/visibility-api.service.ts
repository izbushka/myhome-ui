import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityApiService {
  private visibilityProp: string = null; // true if hidden
  private visibilityEvent: string = null;
  private isVisible: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor() {
    this.setup();
  }

  private setup(): void {
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
      this.visibilityProp = 'hidden';
      this.visibilityEvent = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.visibilityProp = 'msHidden';
      this.visibilityEvent = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.visibilityProp = 'webkitHidden';
      this.visibilityEvent = 'webkitvisibilitychange';
    }

    if (typeof document.addEventListener === 'undefined' || this.visibilityProp === null) {
      console.log('ERROR! This Functional requires a browser, that supports the Page Visibility API.');
    } else {
      // Handle page visibility change
      document.addEventListener(this.visibilityEvent, () => this.handler.apply(this), false);
    }
  }
  private handler(): void {
    if (document[this.visibilityProp]) { // hidden
      this.isVisible.next(false);
    } else {
      this.isVisible.next(true);
    }
  }
  changes(): BehaviorSubject<boolean> {
    return this.isVisible;
  }
}
