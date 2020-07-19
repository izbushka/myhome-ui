import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityApiService {
  private visibilityProp: string = null; // true if hidden
  private visibilityEvent: string = null;
  private isVisible: BehaviorSubject<boolean> = new BehaviorSubject(!document.hidden);
  constructor() {
    this.setup();
  }

  private setup(): void {
    if (typeof document.hidden !== 'undefined') { // Opera 12.10, Firefox 18 + support
      this.visibilityProp = 'hidden';
      this.visibilityEvent = 'visibilitychange';
    // } else if (typeof document.msHidden !== 'undefined') {
    //   this.visibilityProp = 'msHidden';
    //   this.visibilityEvent = 'msvisibilitychange';
    // } else if (typeof document.webkitHidden !== 'undefined') {
    //   this.visibilityProp = 'webkitHidden';
    //   this.visibilityEvent = 'webkitvisibilitychange';
    }

    if (typeof document.addEventListener === 'undefined' || this.visibilityProp === null) {
      console.log('ERROR! This Functional requires a browser, that supports the Page Visibility API.');
    } else {
      // Handle page visibility change
      document.addEventListener(this.visibilityEvent, () => this.handler.apply(this), {passive: true});
    }
  }
  private handler(): void {
    if (document[this.visibilityProp]) { // hidden
      this.isVisible.next(false);
    } else {
      this.isVisible.next(true);
    }
  }
  monitor(): Observable<boolean> {
    return this.isVisible.asObservable();
  }
}
