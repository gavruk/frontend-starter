export interface IBody {
  [key: string]: any;
}

export interface IQuery {
  [key: string]: any;
}

export interface IHeaders {
  [key: string]: string | number | boolean;
}

export interface IXHR {
  abort: () => any;
}

export type RequestOptions = {
  headers?: IHeaders;
  query?: IQuery;
};
