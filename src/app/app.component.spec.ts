import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { AppService } from './app.service';
import { HeaderComponent } from '../base/header/header.component';
import { FooterComponent } from '../base/footer/footer.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
}
  from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentInstance: AppComponent;
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(HeaderComponent),
        MockComponent(FooterComponent)
      ],
      imports: [
        RouterTestingModule,
        MockModule(NgxSpinnerModule)
      ],
      providers: [
        MockProvider(AppService)
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
  });

  it('should: criar o componente', () => {
    expect(componentInstance).toBeTruthy();
  });
  describe('method: ngOnInit', () => {

    it('should: validar se não chama o metodo show', () => {
      (componentInstance as any).appService.changeSpinner = of(false);
      const loadAppSpyShow = jest.spyOn((componentInstance as any).spinner, 'show');
      const loadAppSpyhide = jest.spyOn((componentInstance as any).spinner, 'hide');
      (componentInstance as any).ngOnInit();
      expect(loadAppSpyhide).toHaveBeenCalled();
      expect(loadAppSpyShow).not.toHaveBeenCalled();
    });

    it('should: validar se chama o metodo show', () => {
      (componentInstance as any).appService.changeSpinner = of(true);
      const loadAppSpyShow = jest.spyOn((componentInstance as any).spinner, 'show');
      const loadAppSpyhide = jest.spyOn((componentInstance as any).spinner, 'hide');
      (componentInstance as any).ngOnInit();
      expect(loadAppSpyhide).toHaveBeenCalled();
      expect(loadAppSpyShow).toHaveBeenCalled();
    });
  });
});
