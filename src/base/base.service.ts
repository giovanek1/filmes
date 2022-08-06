import { Injectable } from '@angular/core';
import { Row, ValueRow } from './components/table/table.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  mapMultipleValuesByTable(response: any, configs: any): Array<Row> {
    return (configs.keyOfResponse ? response[configs.keyOfResponse] : response)
      .map((item: any) => {
        let values: Array<ValueRow> = [];
        configs.listOfFields.forEach((element: string) => {
          values.push({ value: item[element] })
        });
        return { values: values };
      });
  }
}
