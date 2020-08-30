import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './catalogue.state';

const appState = createFeatureSelector<State>('appState');

export const productsStateSelector = createSelector(appState, (state: State) => state.products);
export const metaStateSelector = createSelector(appState, (state: State) => state.meta);
export const isLoadingStateSelector = createSelector(appState, (state: State) => state.isLoading);
export const isLoggedStateSelector = createSelector(appState, (state: State) => state.isLogged);
export const errorStateSelector = createSelector(appState, (state: State) => state.error);
