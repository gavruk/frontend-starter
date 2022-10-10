import { IResponse } from "./types";

export interface IError {
  error: string;
  errorMessage?: string;
}
export default class APIError extends Error {
  data: IResponse<IError | string>;

  status: number;

  __proto__: any;

  constructor(data: IResponse<IError | string>, status: number) {
    super(status.toString());
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }

    // a workaround to make `instanceof ApiError` work in ES5 with babel
    this.constructor = APIError;
    this.__proto__ = APIError.prototype; // eslint-disable-line

    this.data = data;
    this.status = status;
  }

  public toString(): string {
    return `${this.status}: ${JSON.stringify(this.data)}`;
  }
}
