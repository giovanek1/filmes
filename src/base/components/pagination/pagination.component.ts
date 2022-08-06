import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Pagination } from './pagination.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  pages: Array<number> = [];
  @Input() config: Pagination;
  @Output() emitPage: EventEmitter<number> = new EventEmitter();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this._setPages();
  }

  private _setPages() {
    let page = this.config.pageNumber;
    if (this.config.first) {
      this.pages = [page + 1, page + 2, page + 3].slice(0, this.config.totalPages);
    } else if (this.config.last) {
      this.pages = [page - 1, page, page + 1];
    } else {
      this.pages = [page, page + 1, page + 2];
    }
  }

  nextPage(page: number) {
    if (page < 1 || page > (this.config.totalPages) || page === (this.config.pageNumber + 1)) return;
    this.emitPage.emit(page);
  }

}
