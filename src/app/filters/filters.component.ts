import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from '../services/routing.service';
import { closeWhen } from '../helpers/rxjs-helper';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  public fg: FormGroup;
  private destroy$: BehaviorSubject<null> = new BehaviorSubject(null);

  constructor(private routingService: RoutingService) {}

  public ngOnInit(): void {
    this.buildFormGroup();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  public buildFormGroup(): void {
    this.fg = new FormGroup({
      search: new FormControl(),
      categoryFilter: new FormControl(),
      priceFilter: new FormControl(),
      sort: new FormControl(),
      ippFilter: new FormControl()
    });
  }

  public resetFilters(): void {
    this.buildFormGroup();
    this.navigate(true);
  }

  public navigate(resetFilters: boolean = false): void {
    this.routingService.getQueryParams$()
      .pipe(closeWhen(this.destroy$))
      .subscribe(params => {
        const search = resetFilters ? null : this.fg.get('search').value || params.search;
        const idCategory = resetFilters ? null : this.fg.get('categoryFilter').value || params.idCategory;
        const price = resetFilters ? null : this.fg.get('priceFilter').value || params.price;
        const sort = resetFilters ? null : this.fg.get('sort').value || params.sort;
        const ipp = this.fg.get('ippFilter').value || params.ipp;
        this.routingService.updateURL({ ...params, search, idCategory, price, sort, ipp });
      });
  }

  public submit(): void {
    this.navigate();
  }
}
