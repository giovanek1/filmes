import { Table } from './../../base/components/table/table.interface';
import { Card } from './../../base/components/card/card.interface';
export const CONFIG_CARD: Card = {
  title: 'List movies',
  style: {'font-size': '10px'}
}

export const CONFIG_TABLE: Table = {
  columns: [
    {name: 'Id', class: 'col-3'},
    {name: 'Year', class: 'col-3'},
    {name: 'Title', class: 'col-3'},
    {name: 'Winner?', class: 'col-3'}
  ],
  rows: []
}

export const MAP_MULTIPLE_VALUES =   {
  queryParameters: '',
  keyOfResponse: 'content',
  listOfFields: ['id', 'year', 'title', 'winner']
};
