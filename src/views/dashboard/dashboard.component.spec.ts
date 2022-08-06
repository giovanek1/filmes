import { AppService } from './../../app/app.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MockModule, MockProvider } from 'ng-mocks';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { BaseService } from '../../base/base.service';
import { CardModule } from '../../base/components/card/card.module';
import { TableModule } from '../../base/components/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CONFIG_TABLE, INDEX_WINNER, MAP_MULTIPLE_VALUES } from './dashboard.const';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export const MOCK_RESPONSE_LIST = {
  "years": [
    {
      "year": 1986,
      "winnerCount": 2
    },
    {
      "year": 1990,
      "winnerCount": 2
    },
    {
      "year": 2015,
      "winnerCount": 2
    }
  ]
}

export const MOCK_RESULT = [
  {
    "values": [
      { "value": 1986 },
      { "value": 2 },
    ],
  },
  {
    "values": [
      { "value": 1990 },
      { "value": 2 },
    ],
  },
  {
    "values": [
      { "value": 2015 },
      { "value": 2 },
    ],
  },
];

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let componentInstance: DashboardComponent;
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
      ],
      imports: [
        RouterTestingModule,
        MockModule(NgxSpinnerModule),
        MockModule(CardModule),
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
    fixture = TestBed.createComponent(DashboardComponent);
    componentInstance = fixture.componentInstance;
  });

  it('should: criar o componente', () => {
    expect(componentInstance).toBeTruthy();
  });
  describe('method: ngOnInit', () => {

    it('should: validar se chama o metodo _makeRequests', () => {
      (componentInstance as any)._makeRequests = jest.fn();
      const loadAppSpyMake = jest.spyOn((componentInstance as any), '_makeRequests');
      (componentInstance as any).ngOnInit();
      expect(loadAppSpyMake).toHaveBeenCalled();
    });
  });
  describe('method: _makeRequests', () => {

    it('should: validar se chama o metodo _makeRequests', () => {
      (componentInstance as any)._getDataByQueryParameters = jest.fn();
      const loadAppSpyGet = jest.spyOn((componentInstance as any), '_getDataByQueryParameters');
      (componentInstance as any)._makeRequests();
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES[0]);
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES[1]);
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES[2]);
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES[3]);
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES[4]);
      expect(loadAppSpyGet).toHaveBeenCalledTimes(5);
    });
  });
  describe('method: _getDataByQueryParameters', () => {

    it('should: validar se chama os metodos corretamente e seta os valores mapeados', done => {
      (componentInstance as any)._baseService = {
        mapMultipleValuesByTable: jest.fn().mockReturnValue(MOCK_RESULT)
      };
      const loadAppSpyGet = jest.spyOn((componentInstance as any)._appService, 'get');
      const loadAppSpyMap = jest.spyOn((componentInstance as any)._baseService, 'mapMultipleValuesByTable');
      (componentInstance as any)._getDataByQueryParameters(MAP_MULTIPLE_VALUES[0]);
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES[0].queryParameters);
      (componentInstance as any)._appService.get(MAP_MULTIPLE_VALUES[0].queryParameters).pipe(
        tap(() => {
          expect(loadAppSpyMap).toHaveBeenCalledWith(MOCK_RESPONSE_LIST, MAP_MULTIPLE_VALUES[0]);
          expect(CONFIG_TABLE.multiple.rows).toStrictEqual(MOCK_RESULT);
          done();
        })
      ).subscribe();
    });
  });
  describe('method: search', () => {

    it('should: validar se não chama os metodos _getDataByQueryParameters e markAsDirty', () => {
      (componentInstance as any)._getDataByQueryParameters = jest.fn();
      const loadAppSpyGet = jest.spyOn((componentInstance as any), '_getDataByQueryParameters');
      const loadAppSpyMark = jest.spyOn((componentInstance as any).yearFormControl, 'markAsDirty');
      (componentInstance as any).search(false);
      expect(loadAppSpyGet).not.toHaveBeenCalled();
      expect(loadAppSpyMark).not.toHaveBeenCalled();
    });

    it('should: validar se não chama o metodo _getDataByQueryParameters e chama o markAsDirty', () => {
      (componentInstance as any)._getDataByQueryParameters = jest.fn();
      (componentInstance as any).yearFormControl = { invalid: true, markAsDirty: jest.fn() };
      const loadAppSpyGet = jest.spyOn((componentInstance as any), '_getDataByQueryParameters');
      const loadAppSpyMark = jest.spyOn((componentInstance as any).yearFormControl, 'markAsDirty');
      (componentInstance as any).search(true);
      expect(loadAppSpyGet).not.toHaveBeenCalled();
      expect(loadAppSpyMark).toHaveBeenCalled();
    });

    it('should: validar se chama o metodo _getDataByQueryParameters e seta a prop queryParameters corretamente com a página informada', () => {
      (componentInstance as any)._getDataByQueryParameters = jest.fn();
      (componentInstance as any).yearFormControl = { invalid: false, value: 2015, markAsDirty: jest.fn() };
      const loadAppSpyGet = jest.spyOn((componentInstance as any), '_getDataByQueryParameters');
      const loadAppSpyMark = jest.spyOn((componentInstance as any).yearFormControl, 'markAsDirty');
      (componentInstance as any).search(true);
      expect(loadAppSpyMark).toHaveBeenCalled();
      expect(MAP_MULTIPLE_VALUES[INDEX_WINNER].queryParameters).toBe(`?winner=true&year=2015`);
      expect(loadAppSpyGet).toHaveBeenCalledWith(MAP_MULTIPLE_VALUES[INDEX_WINNER]);
    });
  });
  describe('method: controlIsInvalid', () => {

    it('should: validar se retorna true quando as props invalid e dirty forem true', () => {
      (componentInstance as any).yearFormControl = { invalid: true, dirty: true };
      const response = (componentInstance as any).controlIsInvalid();
      expect(response).toBeTruthy();
    });

    it('should: validar se retorna true quando pelo menos uma das props invalid e dirty forem false', () => {
      (componentInstance as any).yearFormControl = { invalid: false, dirty: true };
      const response = (componentInstance as any).controlIsInvalid();
      expect(response).toBeFalsy();
    });
  });
});
