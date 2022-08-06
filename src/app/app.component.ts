import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'filmes';
  constructor(
    private spinner: NgxSpinnerService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.changeSpinner.pipe(
      tap((show: boolean) => {
        this.spinner.hide();
        if (show)
          this.spinner.show();
      })
    ).subscribe()
  }

}
