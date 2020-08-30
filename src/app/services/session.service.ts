import { Injectable } from '@angular/core';
import { CookieHelper } from '../helpers/cookie-helper';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionService {
  public static connectedUserEmail: string = null;
  private static connectedUserToken: string = null;
  private static isLoggedSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public clear(): void {
    CookieHelper.deleteToken();
    SessionService.connectedUserToken = null;
    SessionService.isLoggedSubject$.next(false);
  }

  public getToken(): string {
    try {
      return CookieHelper.getToken();
    } catch (err) {
      return null;
    }
  }

  public setToken(token: string): void {
    const d = new Date();
    d.setTime(d.getTime() + (12 * 60 * 60 * 1000));
    CookieHelper.setCookie(`catalogue_token`, token, d, '/');
  }

  public createSession(token: string, email: string): void {
    this.setToken(token);
    SessionService.connectedUserToken = this.getToken();
    SessionService.connectedUserEmail = email;
    SessionService.isLoggedSubject$.next(true);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) { this.clear(); } else { SessionService.isLoggedSubject$.next(true); }
    return !!token;
  }
}
