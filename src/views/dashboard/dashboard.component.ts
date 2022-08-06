import { Component, OnInit } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { AppService } from '../../app/app.service';
import { CARD_KEYS, MAP_MULTIPLE_VALUES, CONFIG_CARD, CONFIG_TABLE, TABLE_KEYS, INDEX_WINNER } from './dashboard.const';
import { FormControl, Validators } from '@angular/forms';
import { BaseService } from '../../base/base.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  readonly CONFIG_TABLE = CONFIG_TABLE;
  readonly CONFIG_CARD = CONFIG_CARD;
  readonly CARD_KEYS = CARD_KEYS;
  readonly TABLE_KEYS = TABLE_KEYS;
  yearFormControl = new FormControl('', [Validators.required, Validators.min(1900), Validators.max(2022)]);
  constructor(private _appService: AppService, private _baseService: BaseService) { }

  ngOnInit() {
    this._makeRequests();
  }

  private _makeRequests() {
    MAP_MULTIPLE_VALUES.forEach((item: any) => {
      this._getDataByQueryParameters(item);
    });
  }

  private _getDataByQueryParameters(config: any) {
    this._appService.get(config.queryParameters).pipe(
      take(1),
      map(response => {
        return this._baseService.mapMultipleValuesByTable(response, config);
      }),
      tap(response => {
        this.CONFIG_TABLE[config.typeTable].rows = response.slice(0, 3);
      })
    ).subscribe();
  }

  search(search: boolean = true) {
    if (!search) return;
    this.yearFormControl.markAsDirty();
    if (this.yearFormControl.invalid) return;
    MAP_MULTIPLE_VALUES[INDEX_WINNER].queryParameters = `?winner=true&year=${this.yearFormControl.value}`
    this._getDataByQueryParameters(MAP_MULTIPLE_VALUES[INDEX_WINNER]);
  }

  controlIsInvalid(): boolean {
    return this.yearFormControl.invalid && this.yearFormControl.dirty
  }
}
