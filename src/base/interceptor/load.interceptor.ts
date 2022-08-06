import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
@Injectable()
export class LoadInterceptor implements HttpInterceptor {

  constructor(private appService: AppService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.appService.showSpinner();
    return next.handle(req).pipe(
      tap((re: any) => {
        if(re?.body)
          this.appService.showSpinner(false);
      }),
      catchError(err => {
        this.appService.showSpinner(false);
        console.error(err);
        return throwError(err);
      }
      )
    );
  }
}
