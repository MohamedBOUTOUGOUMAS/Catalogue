import { Cookie } from 'ng2-cookies';

export class CookieHelper {
  public static setCookie(name: string,
                          value: string,
                          expires?: number | Date,
                          path?: string,
                          domain?: string,
                          secure?: boolean): void {
    try {
      Cookie.set(name, value, expires, path, domain, secure);
    } catch (e) {
      console.error(`CookieHelper Error --> setting cookie ${name}`, e);
    }
  }

  private static checkCookieApp(name: string): boolean {
    try {
      return Cookie.check(`catalogue_${name}`);
    } catch (e) {
      console.error(`CookieHelper Error --> checking cookie catalogue_${name}`, e);
      return false;
    }
  }

  public static checkCookie(name: string): boolean {
    if (CookieHelper.checkCookieApp) { return true; }
    try {
      return Cookie.check(name);
    } catch (e) {
      console.error(`CookieHelper Error --> checking cookie ${name}`, e);
      return false;
    }
  }

  public static getToken(): string {
    try {
      return Cookie.get(`catalogue_token`);
    } catch (e) {
      console.error(`CookieHelper Error --> getting token`);
      return null;
    }
  }

  public static deleteToken(app?: string): void {
    try {
      Cookie.delete('token', '/');
      Cookie.delete(`catalogue_token`, '/');
    } catch (e) {
      console.error(`CookieHelper Error --> deletting token`, e);
    }
  }

  public static getCookie(name: string): string {
    try {
      return Cookie.get(name);
    } catch (e) {
      console.error(`CookieHelper Error --> getting cookie ${name}`, e);
      return null;
    }
  }

  public static deleteCookie(name: string, path?: string, domain?: string): void {
    try {
      Cookie.delete(name, path, domain);
    } catch (e) {
      console.error(`CookieHelper Error --> deletting cookie ${name}`, e);
    }
  }

  public static deleteAllCookies(): void {
    document.cookie
      .split(';')
      .forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
  }
}
