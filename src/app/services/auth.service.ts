import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  token: string = null;

  constructor(private router: Router) {}

  authorized(state: boolean) {
    this.isAuthorized.next(state);
  }

  setToken(token: string): void {
    this.token = token;
  }

  hasToken(): boolean {
    return this.token && this.token.length > 0;
  }

  doLogin(username: string, password: string): void {
    if (username.length > 2 && password.length > 2) {
      this.makeToken(username, password);
      this.authorized(true);
    }
    // this.router.navigate(['/pocetna'], { queryParams: { 'refresh': 1 } });
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/dashboard']);
    });
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //   this.router.navigate([currentUrl]);
    // });
  }
  makeToken(username: string, password: string): string {
    const token = btoa(username + ':' + password);
    this.setToken(token);
    return token;
  }

  getAuthHeader(): string {
    return 'Basic ' + this.token;
  }
}
