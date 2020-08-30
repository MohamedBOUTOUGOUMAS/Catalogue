import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsApiService {
  constructor(public http: HttpClient, public session: SessionService) {
  }

  public getAll(ipp = 60, page = 1): Observable<any> {
    const token = this.session.getToken();
    const url = `https://www.artsper.com/api/artworks?statuses[]=status2&ipp=${ipp}&page=${page}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'x-token': token});
    return this.http.get<any>(url, { headers });
  }

}
