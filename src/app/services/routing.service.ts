import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from 'lodash';

@Injectable()
export class RoutingService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public getQueryParams$(): Observable<any> {
    return this.activatedRoute.queryParams.pipe(map(params => this.fetchDataFromUrl(params)));
  }

  public fetchDataFromUrl(params): any {
    const { search, price, sort, ipp, page } = params;
    const idCategory = params['id_category[]'];
    const status = params['statuses[]'];
    return {
      search,
      price,
      sort: sort ? _.toInteger(sort) : undefined,
      idCategory: idCategory ? _.toInteger(idCategory) : undefined,
      status,
      ipp: ipp ? _.toInteger(ipp) : undefined,
      page: page ? _.toInteger(page) : undefined,
    };
  }

  public getUrl(options): string {
    const params = `${ options.status ? 'statuses[]=' + options.status : '' }${ options.search ? '&search=' + options.search : '' }${ options.idCategory ? '&id_category[]=' + options.idCategory : '' }${ options.price ? '&price=' + options.price : '' }${ options.sort ? '&sort=' + options.sort : '' }${ options.ipp ? '&ipp=' + options.ipp : '' }${ options.page ? '&page=' + options.page : '' }`;
    if (params.charAt(0) === '&') { params.substr(0, 1); }
    return `products?${params}`;

  }

  public updateURL(options): void {
    const url = this.getUrl(options);
    this.router.navigateByUrl(url);
  }
}
