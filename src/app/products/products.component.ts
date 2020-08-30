import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { closeWhen } from '../helpers/rxjs-helper';
import { ProductsHelper } from '../helpers/products-helper';
import { RoutingService } from '../services/routing.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-expositions',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products$: Observable<any[]>;
  public metaData$: Observable<any>;
  private destroy$: BehaviorSubject<null> = new BehaviorSubject(null);
  public ipp = 60;
  public page;
  public isLoading$: Observable<boolean>;

  constructor(private storeService: StoreService<any>,
              private routingService: RoutingService) {
  }
  public ngOnInit(): void {
    this.isLoading$ = this.storeService.isLoading$();

    this.routingService.getQueryParams$()
      .pipe(closeWhen(this.destroy$))
      .subscribe(params => {
        const { search, price, sort, idCategory, ipp, page } = params;
        if (this.page !== page || this.ipp !== ipp) {
          this.storeService.loadProduits(ipp, page);
        }
        this.ipp = ipp;
        this.page = page;

        this.products$ = this.storeService.getProduitsFromStore(
          (produit) => (
            ProductsHelper.patternMatch(produit.artwork_title, search) &&
            ProductsHelper.categoryFilter(produit.category.label.fr, idCategory) &&
            ProductsHelper.priceFilter(produit.artwork_price, price)
          ),
          ProductsHelper.getSortFunction(sort));
        this.metaData$ = this.storeService.getMetaFromStore();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  public onChangePage(page: number): void {
    this.routingService.updateURL({ status: ProductsHelper.DEFAULT_STATUS, ipp: this.ipp, page });
  }
}
