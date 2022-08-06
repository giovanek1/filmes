import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
}
  from '@angular/platform-browser-dynamic/testing';
import { Pagination } from './pagination.interface';
describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let componentInstance: PaginationComponent;
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        PaginationComponent,
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    componentInstance = fixture.componentInstance;
  });

  it('should: criar o componente', () => {
    expect(componentInstance).toBeTruthy();
  });

  describe('method: ngOnChanges', () => {
    it('should: validar se chama o metodo _setPages', () => {
      (componentInstance as any)._setPages = jest.fn();
      const loadAppSpySet = jest.spyOn((componentInstance as any), '_setPages');
      (componentInstance as any).ngOnChanges();
      expect(loadAppSpySet).toHaveBeenCalled();
    });
  });

  describe('method: _setPages', () => {
    it('should: validar se seta as paginas corretamente quando a prop first é true', () => {
      (componentInstance as any).config = {
        first: true,
        last: false,
        pageNumber: 0,
        totalPages: 14,
        totalElements: 210,
        pageSize: 15
      } as Pagination;
      (componentInstance as any)._setPages();
      expect((componentInstance as any).pages).toStrictEqual([1, 2, 3]);
    });
    it('should: validar se seta as paginas corretamente quando a prop first é true e possui apenas 2 paginas', () => {
      (componentInstance as any).config = {
        first: true,
        last: false,
        pageNumber: 0,
        totalPages: 2,
        totalElements: 25,
        pageSize: 15
      } as Pagination;
      (componentInstance as any)._setPages();
      expect((componentInstance as any).pages).toStrictEqual([1, 2]);
    });
    it('should: validar se seta as paginas corretamente quando a prop last é true', () => {
      (componentInstance as any).config = {
        first: false,
        last: true,
        pageNumber: 14,
        totalPages: 14,
        totalElements: 210,
        pageSize: 15
      } as Pagination;
      (componentInstance as any)._setPages();
      expect((componentInstance as any).pages).toStrictEqual([13, 14, 15]);
    });
    it('should: validar se seta as paginas corretamente quando a prop last e fist são falsas', () => {
      (componentInstance as any).config = {
        first: false,
        last: false,
        pageNumber: 6,
        totalPages: 14,
        totalElements: 210,
        pageSize: 15
      } as Pagination;
      (componentInstance as any)._setPages();
      expect((componentInstance as any).pages).toStrictEqual([6, 7, 8]);
    });
  });
  describe('method: nextPage', () => {
    it('should: validar se não emit o evento quando a página é menor que 1', () => {
      (componentInstance as any).config = {
        first: true,
        last: false,
        pageNumber: 0,
        totalPages: 14,
        totalElements: 210,
        pageSize: 15
      } as Pagination;
      const loadAppSpyEmit = jest.spyOn((componentInstance as any).emitPage, 'emit');
      (componentInstance as any).nextPage(0);
      expect(loadAppSpyEmit).not.toHaveBeenCalled();
    });
    it('should: validar se não emit o evento quando a página é maior que o total de páginas', () => {
      (componentInstance as any).config = {
        first: true,
        last: false,
        pageNumber: 0,
        totalPages: 14,
        totalElements: 210,
        pageSize: 15
      } as Pagination;
      const loadAppSpyEmit = jest.spyOn((componentInstance as any).emitPage, 'emit');
      (componentInstance as any).nextPage(15);
      expect(loadAppSpyEmit).not.toHaveBeenCalled();
    });
    it('should: validar se não emit o evento quando a página é igual a página atual', () => {
      (componentInstance as any).config = {
        first: true,
        last: false,
        pageNumber: 2,
        totalPages: 14,
        totalElements: 210,
        pageSize: 15
      } as Pagination;
      const loadAppSpyEmit = jest.spyOn((componentInstance as any).emitPage, 'emit');
      (componentInstance as any).nextPage(3);
      expect(loadAppSpyEmit).not.toHaveBeenCalled();
    });
    it('should: validar se emit o evento passando a pagina selecionada', () => {
      (componentInstance as any).config = {
        first: true,
        last: false,
        pageNumber: 2,
        totalPages: 14,
        totalElements: 210,
        pageSize: 15
      } as Pagination;
      const loadAppSpyEmit = jest.spyOn((componentInstance as any).emitPage, 'emit');
      (componentInstance as any).nextPage(4);
      expect(loadAppSpyEmit).toHaveBeenCalledWith(4);
    });
  });
});
