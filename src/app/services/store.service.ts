import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { State } from '../../store/catalogue.state';
import _ from 'lodash';
import { CatalogueActions } from '../../store/catalogue.action';
import {
  errorStateSelector,
  isLoadingStateSelector,
  isLoggedStateSelector,
  metaStateSelector,
  productsStateSelector
} from '../../store/catalogue.selectors';

@Injectable()
export class StoreService<T> {
  constructor(public store: Store<State>) {
  }

  public getProduitsFromStore(filterFuncOrObject?: ((a: T) => boolean) | Partial<T>,
                              sortFunction: (x: T, y: T) => number = null): Observable<T[]> {
    let filterFunc: (a: T) => boolean;
    if (typeof filterFuncOrObject === 'function') {
      filterFunc = filterFuncOrObject as (a: T) => boolean;
    } else if (filterFuncOrObject === null) {
      filterFunc = (a: T): boolean => _.reduce(filterFuncOrObject, (res, value, key) => res && (a[key] === value), true);
    }
    return this.store
      .pipe(
        select(productsStateSelector),
        map((products) => _.filter(products, expo => filterFunc(expo))),
        map((x: T[]) => (sortFunction ? x.sort(sortFunction) : x)),
      );
  }
  public isLogged$(): Observable<boolean> {
    return this.store.pipe(select(isLoggedStateSelector));
  }

  public isLoading$(): Observable<boolean> {
    return this.store.pipe(select(isLoadingStateSelector));
  }

  public getMetaFromStore(): Observable<any> {
    return this.store.pipe(select(metaStateSelector));
  }

  public getErrorFromStore(): Observable<any> {
    return this.store.pipe(select(errorStateSelector));
  }

  public loadProduits(ipp, page): void {
    this.store.dispatch(CatalogueActions.loadProducts(ipp, page));
  }

  public login(email, pass): void {
    this.store.dispatch(CatalogueActions.loginAction(email, pass));
  }
}
