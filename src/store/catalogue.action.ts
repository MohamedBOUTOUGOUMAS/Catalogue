import { Action } from '@ngrx/store';

export interface CatalogueAction extends Action{
  payload?: any;
}

export class CatalogueActions {
  public static LOGIN = '[Authentication] Login...';
  public static LOGIN_SUCCESS = '[Authentication] Login step success';
  public static LOGIN_FAIL = '[Authentication] Login step failed';
  public static LOAD_PRODUCTS = '[Products] Loading ...';
  public static LOAD_PRODUCTS_SUCCESS = '[Products] Loading successful';
  public static LOAD_PRODUCTS_FAIL = '[Products] Loading failed';

  public static loginAction(email: string, password: string): CatalogueAction {
    return {
      type: CatalogueActions.LOGIN,
      payload: {
        email, password
      }
    };
  }

  public static loginSuccessAction(data: any): CatalogueAction {
    return {
      type: CatalogueActions.LOGIN_SUCCESS,
      payload: {
        ...data
      }
    };
  }

  public static loginFailedAction(error: any): CatalogueAction {
    return {
      type: CatalogueActions.LOGIN_FAIL,
      payload: {
        ...error
      }
    };
  }

  public static loadProducts(ipp, page): CatalogueAction {
    return {
      type: CatalogueActions.LOAD_PRODUCTS,
      payload: {
        ipp,
        page,
      }
    };
  }

  public static loadProductsSuccess(data: any): CatalogueAction {
    return {
      type: CatalogueActions.LOAD_PRODUCTS_SUCCESS,
      payload: {
        ...data
      },
    };
  }

  public static loadProductsFail(err): CatalogueAction {
    return {
      type: CatalogueActions.LOAD_PRODUCTS_FAIL,
      payload: {
        ...err
      },
    };
  }
}
