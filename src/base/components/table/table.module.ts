import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    TableComponent
  ],
  declarations: [TableComponent]
})
export class TableModule { }
