import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import _ from 'lodash';
declare var require: any;
const paginate = require('jw-paginate');

@Component({
  selector: 'app-jw-pagination',
  template: `<ul *ngIf="pager.pages && pager.pages.length" class="pagination">
    <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item first-item">
      <a (click)="setPage(1)" class="page-link">Premier</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === 1}" class="page-item previous-item">
      <a (click)="setPage(pager.currentPage - 1)" class="page-link">Précédent</a>
    </li>
    <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}" class="page-item number-item">
      <a (click)="setPage(page)" class="page-link">{{page}}</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item next-item">
      <a (click)="setPage(pager.currentPage + 1)" class="page-link">Suivant</a>
    </li>
    <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}" class="page-item last-item">
      <a (click)="setPage(pager.totalPages)" class="page-link">Dernier</a>
    </li>
  </ul>`,
  styles: ['ul li { cursor:pointer; }']
})

export class JwPaginationComponent implements OnInit, OnChanges {
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 5;
  @Input() totalPages: number;
  items: Array<any> = [];
  pager: any = {};

  ngOnInit(): void {
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.items = _.range(this.totalPages);
  }

  public setPage(page: number): void {
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);
    this.changePage.emit(page);
  }
}
