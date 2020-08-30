import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from './session.service';

export interface ILoginApi {
  email: string;
  password: string;
}

@Injectable()
export class LoginV2ApiService {
  constructor(public http: HttpClient, private session: SessionService) {
  }

  public loginApiCall(payload: ILoginApi): Observable<any> {
    const url = 'https://www.artsper.com/api/auth-v2/login';
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post<any>(url, payload, {headers})
      .pipe(
        tap((res: any) => {
          this.session.createSession(res.token, payload.email);
        }),
      );
  }

}
