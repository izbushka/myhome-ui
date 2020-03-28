import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
import {AppStorageService} from './app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authorizedSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private token: string = null;
  private lastUsername: string = null;

  constructor(
    private router: Router,
    private appStorageService: AppStorageService
  ) {
    this.token = this.appStorageService.get('session', 'token');
    this.lastUsername = this.appStorageService.get('local', 'username') || '';
  }

  authorized(state: boolean) {
    this.authorizedSubject.next(state);
  }

  monitor(): BehaviorSubject<boolean> {
   return this.authorizedSubject;
  }

  isAuthorized(): boolean {
    return this.authorizedSubject.getValue();
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
}
