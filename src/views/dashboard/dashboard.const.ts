import { Card } from './../../base/components/card/card.interface';
import { Table } from './../../base/components/table/table.interface';

export const CARD_KEYS = {
  multiple: 'multiple',
  topThree: 'topThree',
  interval: 'interval',
  winners: 'winners',
}

export const TABLE_KEYS = {
  multiple: 'multiple',
  topThree: 'topThree',
  maxInterval: 'maxInterval',
  minInterval: 'minInterval',
  winners: 'winners',
}

export const CONFIG_TABLE = {
  [TABLE_KEYS.multiple]: {
    columns: [
      {name: 'Year', class: 'col-6'},
      {name: 'Win Count', class: 'col-6'}
    ],
    rows: []
  } as Table,
  [TABLE_KEYS.topThree]: {
    columns: [
      {name: 'Name', class: 'col-6'},
      {name: 'Win Count', class: 'col-6'}
    ],
    rows: []
  } as Table,
  [TABLE_KEYS.maxInterval]: {
    columns: [
      {name: 'Producer', class: 'col-3'},
      {name: 'Interval', class: 'col-3'},
      {name: 'Previous Year', class: 'col-3'},
      {name: 'Following Year', class: 'col-3'}
    ],
    rows: []
  } as Table,
  [TABLE_KEYS.minInterval]: {
    columns: [
      {name: 'Producer', class: 'col-3'},
      {name: 'Interval', class: 'col-3'},
      {name: 'Previous Year', class: 'col-3'},
      {name: 'Following Year', class: 'col-3'}
    ],
    rows: []
  } as Table,
  [TABLE_KEYS.winners]: {
    columns: [
      {name: 'Id', class: 'col-4'},
      {name: 'Year', class: 'col-4'},
      {name: 'Title', class: 'col-4'}
    ],
    rows: []
  } as Table,
}

export const CONFIG_CARD = {
  [CARD_KEYS.multiple]: {
    title: 'List years with multiple winners',
    style: {'font-size': '10px'}
  } as Card,
  [CARD_KEYS.topThree]: {
    title: 'Top 3 studios with winners',
    style: {'font-size': '10px'}
  } as Card,
  [CARD_KEYS.interval]: {
    title: 'Producers with longest and shortest interval between wins',
    style: {'font-size': '10px'}
  } as Card,
  [CARD_KEYS.winners]: {
    title: 'List movie winner by year',
    style: {'font-size': '10px', 'height': '252px'}
  } as Card,
}

export const INDEX_WINNER = 4;

export const MAP_MULTIPLE_VALUES = [
  {
    queryParameters: '?projection=years-with-multiple-winners',
    keyOfResponse: 'years',
    listOfFields: ['year', 'winnerCount'],
    typeTable: TABLE_KEYS.multiple
  },
  {
    queryParameters: '?projection=studios-with-win-count',
    keyOfResponse: 'studios',
    listOfFields: ['name', 'winCount'],
    typeTable: TABLE_KEYS.topThree
  },
  {
    queryParameters: '?projection=max-min-win-interval-for-producers',
    keyOfResponse: 'max',
    listOfFields: ['producer', 'interval', 'previousWin', 'followingWin'],
    typeTable: TABLE_KEYS.maxInterval
  },
  {
    queryParameters: '?projection=max-min-win-interval-for-producers',
    keyOfResponse: 'min',
    listOfFields: ['producer', 'interval', 'previousWin', 'followingWin'],
    typeTable: TABLE_KEYS.minInterval
  },
  {
    queryParameters: '?winner=true&year=2018',
    listOfFields: ['id', 'year', 'title'],
    typeTable: TABLE_KEYS.winners
  },
];
