import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginV2Component } from './login-v2/login-v2.component';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { reducer } from '../store/catalogue.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CatalogueEffects } from '../store/catalogue.effects';
import { SessionService } from './services/session.service';
import { LoginV2ApiService } from './services/login-v2.api.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { StoreService } from './services/store.service';
import { ProductsApiService } from './services/products-api.service';
import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { FiltersComponent } from './filters/filters.component';
import { RoutingService } from './services/routing.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginV2Component,
    ProductsComponent,
    FiltersComponent,
    JwPaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot({ appState: reducer }),
    EffectsModule.forRoot([CatalogueEffects]),
    HttpClientModule,
  ],
  providers: [
    SessionService,
    CatalogueEffects,
    LoginV2ApiService,
    StoreService,
    ProductsApiService,
    RoutingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
