import { AppService } from './../../app/app.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MockModule, MockProvider } from 'ng-mocks';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { BaseService } from '../../base/base.service';
import { CardModule } from '../../base/components/card/card.module';
import { PaginationModule } from '../../base/components/pagination/pagination.module';
import { TableModule } from '../../base/components/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CONFIG_TABLE, MAP_MULTIPLE_VALUES } from './list.const';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export const MOCK_RESPONSE_LIST = {
  "content": [
    {
      "id": 181,
      "year": 2015,
      "title": "Fantastic Four",
      "studios": [
        "20th Century Fox"
      ],
      "producers": [
        "Gregory Goodman",
        "Hutch Parker",
        "Matthew Vaughn",
        "Robert Kulzer",
        "Simon Kinberg"
      ],
      "winner": true
    },
    {
      "id": 182,
      "year": 2015,
      "title": "Fifty Shades of Grey",
      "studios": [
        "Focus Features",
        "Universal Pictures"
      ],
      "producers": [
        "Dana Brunetti",
        "E. L. James",
        "Michael De Luca"
      ],
      "winner": true
    }
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "pageSize": 15,
    "pageNumber": 0,
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalPages": 1,
  "totalElements": 2,
  "last": true,
  "first": true,
  "sort": {
    "sorted": false,
    "unsorted": true,
    "empty": true
  },
  "size": 15,
  "number": 0,
  "numberOfElements": 2,
  "empty": false
}

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let componentInstance: ListComponent;
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      imports: [
        RouterTestingModule,
        MockModule(NgxSpinnerModule),
        MockModule(CardModule),
        MockModule(PaginationModule),
        MockModule(TableModule),
        ReactiveFormsModule
      ],
      providers: [
        MockProvider(BaseService),
        MockProvider(AppService, {
          get: (queryParameter: string) => of(MOCK_RESPONSE_LIST)
        }),
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    componentInstance = fixture.componentInstance;
  });

  it('should: criar o componente', () => {
    expect(componentInstance).toBeTruthy();
  });
  describe('method: ngOnInit', () => {

    it('should: validar se chama o metodo _getDataByQueryParameters e se set a prop queryParameters corretamente', () => {
      (componentInstance as any)._getDataByQueryParameters = jest.fn();
      const loadAppSpyGet = jest.spyOn((componentInstance as any), '_getDataByQueryParameters');
      (componentInstance as any).ngOnInit();
      expect(loadAppSpyGet).toHaveBeenCalled();
      expect(MAP_MULTIPLE_VALUES.queryParameters).toBe('?page=0&size=15');
    });
  });
  describe('method: _getDataByQueryParameters', () => {

    it('should: validar se chama os metodos corretamente e seta os valores mapeados', done => {
      MAP_MULTIPLE_VALUES.queryParameters = '?page=0&size=15';
      (componentInstance as any)._baseService = {
        mapMultipleValuesByTable: jest.fn().mockReturnValue([
          {
            "values": [
              { "value": 181 },
              { "value": 2015 },
              { "value": "Fantastic Four" },
              { "value": true }
            ]
          },
          {
            "values": [
              { "value": 182 },
              { "value": 2015 },
              { "value": "Fifty Shades of Grey" },
              { "value": true }
            ]
          }
        ])
      };
      const loadAppSpyGet = jest.spyOn((componentInstance as any)._appService, 'get');
      const loadAppSpyMap = jest.spyOn((componentInstance as any)._baseService, 'mapMultipleValuesByTable');
      (componentInstance as any)._getDataByQueryParameters(MAP_MULTIPLE_VALUES);
      expect(loadAppSpyGet).toHaveBeenCalledWith('?page=0&size=15');
      (componentInstance as any)._appService.get(MAP_MULTIPLE_VALUES.queryParameters).pipe(
        tap(() => {
          expect(loadAppSpyMap).toHaveBeenCalledWith(MOCK_RESPONSE_LIST, MAP_MULTIPLE_VALUES);
          expect((componentInstance as any).paginationConfig).toStrictEqual({
            first: true,
            last: true,
            pageNumber: 0,
            totalPages: 1,
            totalElements: 2,
            pageSize: 15
          });
          expect(CONFIG_TABLE.rows).toStrictEqual([
            {
              "values": [
                { "value": 181 },
                { "value": 2015 },
                { "value": "Fantastic Four" },
                { "value": true }
              ]
            },
            {
              "values": [
                { "value": 182 },
                { "value": 2015 },
                { "value": "Fifty Shades of Grey" },
                { "value": true }
              ]
            }
          ]);
          done();
        })
      ).subscribe();
    });
  });
  describe('method: search', () => {

    it('should: validar se não chama o metodo _getDataByQueryParameters', () => {
      (componentInstance as any)._getDataByQueryParameters = jest.fn();
      const loadAppSpyGet = jest.spyOn((componentInstance as any), '_getDataByQueryParameters');
      (componentInstance as any).search(false, 0);
      expect(loadAppSpyGet).not.toHaveBeenCalled();
    });

    it('should: validar se chama o metodo _getDataByQueryParameters e seta a prop queryParameters corretamente com a página 0', () => {
      (componentInstance as any)._getDataByQueryParameters = jest.fn();
      const loadAppSpyGet = jest.spyOn((componentInstance as any), '_getDataByQueryParameters');
      (componentInstance as any).search(true, 2, true);
      expect(MAP_MULTIPLE_VALUES.queryParameters).toBe(`?page=0&size=15&year=&winner=`);
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES);
    });

    it('should: validar se chama o metodo _getDataByQueryParameters e seta a prop queryParameters corretamente com a página informada', () => {
      (componentInstance as any)._getDataByQueryParameters = jest.fn();
      const loadAppSpyGet = jest.spyOn((componentInstance as any), '_getDataByQueryParameters');
      (componentInstance as any).search(true, 2, false);
      expect(MAP_MULTIPLE_VALUES.queryParameters).toBe(`?page=1&size=15&year=&winner=`);
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES);
    });
  });
});
