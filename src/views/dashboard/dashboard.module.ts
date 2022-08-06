import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseService } from 'src/base/base.service';
import { CardModule } from 'src/base/components/card/card.module';
import { TableModule } from 'src/base/components/table/table.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule
  ],
  providers: [BaseService],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
