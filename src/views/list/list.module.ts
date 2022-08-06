import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseService } from 'src/base/base.service';
import { CardModule } from 'src/base/components/card/card.module';
import { PaginationModule } from 'src/base/components/pagination/pagination.module';
import { TableModule } from 'src/base/components/table/table.module';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    ListRoutingModule,
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    PaginationModule
  ],
  providers: [BaseService],
  bootstrap: [ListComponent]
})
export class ListModule { }
