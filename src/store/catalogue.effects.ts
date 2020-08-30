import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { CatalogueActions, CatalogueAction } from './catalogue.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ILoginApi, LoginV2ApiService } from '../app/services/login-v2.api.service';
import { of } from 'rxjs';
import { ProductsApiService } from '../app/services/products-api.service';

@Injectable()
export class CatalogueEffects {

  constructor(
    private action$: Actions,
    public loginApiservice: LoginV2ApiService,
    public produitsApiService: ProductsApiService,
  ) {
  }
  @Effect()
  public loginData$ = this.action$
    .pipe(
      ofType(CatalogueActions.LOGIN),
      map((action: CatalogueAction) => action.payload),
      switchMap((payload: ILoginApi) => {
        return this.loginApiservice.loginApiCall(payload)
          .pipe(
            map(data => CatalogueActions.loginSuccessAction(data)),
            catchError(error => of(CatalogueActions.loginFailedAction(error)))
          );
      }),
    );

  @Effect()
  public loadExpositions$ = this.action$
    .pipe(
      ofType(CatalogueActions.LOAD_PRODUCTS),
      map((action: CatalogueAction) => action.payload),
      switchMap((payload) => {
        const { page, ipp } = payload;
        return this.produitsApiService.getAll(ipp, page)
          .pipe(
            map((data) => CatalogueActions.loadProductsSuccess({ products: data.data, meta: data.meta })),
            catchError(err => of(CatalogueActions.loadProductsFail(err)))
          );
      })
    );
}
