import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject(true);
  token: string = null;

  constructor() {}

  authorized(state: boolean) {
    this.isAuthorized.next(state);
  }

  setToken(token: string): void {
    this.token = token;
  }

  hasToken(): boolean {
    return this.token && this.token.length > 0;
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
