import { State } from './catalogue.state';
import { Action } from '@ngrx/store';
import { CatalogueActions } from './catalogue.action';
import _ from 'lodash';

const initialState: State = {
  isLoading: false,
  isLogged: false,
  products: [],
  meta: null,
  error: null,
};


export function reducer(state = initialState, action: Action): State {
  switch (action.type){
    case CatalogueActions.LOGIN:
      return {
        ...state,
        isLoading: true,
        isLogged: false,
      };
    case CatalogueActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true,
      };
    case CatalogueActions.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        error: _.get(action, 'payload.error'),
      };
    case CatalogueActions.LOAD_PRODUCTS:
      return {
        ...state,
        isLoading: true,
        products: [],
      };
    case CatalogueActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: _.get(action, 'payload.products'),
        meta: _.get(action, 'payload.meta'),
      };
    default:
      return state;
  }
}
