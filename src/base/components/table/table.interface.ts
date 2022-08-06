export interface Table {
  columns: Array<Column>;
  rows: Array<Row>;
  class?: string,
  style?: { [klass: string]: any };
}

export interface Column {
  name: string;
  class?: string;
  style?: { [klass: string]: any };
}

export interface Row {
  values: Array<ValueRow>;
}

export interface ValueRow {
  value: string | number;
  class?: string;
  style?: { [klass: string]: any };
}

