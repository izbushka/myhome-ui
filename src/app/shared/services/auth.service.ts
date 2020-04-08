import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import {AppStorageService} from './app-storage.service';
import {delay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authorized$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private adminAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private token: string = null;
  private lastUsername: string = null;
  private adminPassword: string = null;

  constructor(
    private router: Router,
    private appStorageService: AppStorageService
  ) {
    this.token = this.appStorageService.get('session', 'token');
    this.lastUsername = this.appStorageService.get('local', 'username') || '';
  }

  authorized(state: boolean) {
    this.authorized$.next(state);
  }

  monitor(): BehaviorSubject<boolean> {
   return this.authorized$;
  }

  isAuthorized(): boolean {
    return this.authorized$.getValue();
  }

  setToken(token: string): void {
    this.token = token;
  }

  hasToken(): boolean {
    return this.token && this.token.length > 0;
  }

  doLogin(username: string, password: string): void {
    if (username.length > 2 && password.length > 2) {
      this.lastUsername = username;
      this.appStorageService.set('local', 'username', username);
      this.makeToken(username, password);
      this.authorized(true);
      this.appStorageService.set('session', 'token', this.token, 600);
    }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/dashboard']);
    });
    // const currentUrl = this.router.url;
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

  getUsername(): string {
    return this.lastUsername;
  }

  doAdminLogin(password: string): Observable<boolean> {
    let success = false;
    if (password.split('').map(a => parseInt(a)).reduce((a,b) => a + b) === 32) {
      this.adminPassword = password;
      success = true;
    }
    // setTimeout(_=>this.adminAuthorized$.next(false),4000);
    return of(success).pipe(
      tap(val => this.adminAuthorized$.next(val))
    );
  }
  isAdminAuthorized(): BehaviorSubject<boolean> {
    // return new BehaviorSubject<boolean>(true);
    return this.adminAuthorized$;
  }
}
