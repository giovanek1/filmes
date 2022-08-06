import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  @Output() changeSpinner = new EventEmitter();
  constructor(private httpClient: HttpClient) {}
  readonly API_URL = 'https://tools.texoit.com/backend-java/api/movies';
  showSpinner(show: boolean = true) {
    this.changeSpinner.emit(show);
  }

  get(queryParameters: string = ''): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${queryParameters}`);
  }
}
