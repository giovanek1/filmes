import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, take, tap } from 'rxjs/operators';
import { AppService } from '../../app/app.service';
import { BaseService } from '../../base/base.service';
import { Pagination } from '../../base/components/pagination/pagination.interface';
import { CONFIG_CARD, CONFIG_TABLE, MAP_MULTIPLE_VALUES } from './list.const';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  readonly CONFIG_CARD = CONFIG_CARD
  readonly CONFIG_TABLE = CONFIG_TABLE
  readonly CONTROL = (name: string) => this.listFormGroup.get(name) as FormControl;
  paginationConfig: Pagination;
  listFormGroup: FormGroup = this._fb.group({
    year: new FormControl(''),
    winner: new FormControl('')
  });
  constructor(
    private _appService: AppService,
    private _baseService: BaseService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    MAP_MULTIPLE_VALUES.queryParameters = '?page=0&size=15';
    this._getDataByQueryParameters(MAP_MULTIPLE_VALUES);
  }

  private _getDataByQueryParameters(config: any) {
    this._appService.get(config.queryParameters).pipe(
      take(1),
      map(response => {
        return {
          rows: this._baseService.mapMultipleValuesByTable(response, config),
          pagination: {
            first: response.first,
            last: response.last,
            totalElements: response.totalElements,
            totalPages: response.totalPages,
            pageNumber: response.pageable.pageNumber,
            pageSize: response.pageable.pageSize,
          }
        };
      }),
      tap(response => {
        this.CONFIG_TABLE.rows = response.rows;
        this.paginationConfig = response.pagination;
      })
    ).subscribe();
  }

  search(search: boolean, page: number, isFilter: boolean = true) {
    if (!search) return;
    const PARAMETERS = `?page=${(isFilter ? 0 : page - 1)}&size=15` +
    `&year=${this.CONTROL('year').value ?? ''}&winner=${this.CONTROL('winner').value}`
    MAP_MULTIPLE_VALUES.queryParameters = PARAMETERS;
    this._getDataByQueryParameters(MAP_MULTIPLE_VALUES);
  }
}
