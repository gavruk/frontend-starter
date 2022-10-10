import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import APIError from "./api.error";
import { buildQueryString } from "./api.helpers";
import {
  IQuery,
  IBody,
  IHeaders,
  RequestOptions,
} from "./types";
import { getToken } from '../helpers/storage';

export default class APIClient {
  private _baseUrl: string;

  private _defaultHeaders: IHeaders;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private buildUrl(url?: string, query?: IQuery): string {
    if (!url) {
      return "";
    }
    let queryString = "";
    if (query) {
      queryString = buildQueryString(query);
    }

    if (url[0] === "/") {
      return `${this._baseUrl}${url}${queryString}`;
    }

    return `${this._baseUrl}/${url}${queryString}`;
  }

  private async sendRequest(options: AxiosRequestConfig): Promise<any> {
    const requestOptions = this.makeRequestOptions(options);
    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      throw new APIError(err.response.data, err.response.status);
    }
  }

  private getAuthHeaders(): IHeaders | null {
    const token = getToken();
    if (!token) {
      return null;
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private makeRequestOptions(options: AxiosRequestConfig): AxiosRequestConfig {
    let headers: IHeaders = {
      ...this._defaultHeaders,
    };

    if (options.headers) {
      headers = {
        ...headers,
        ...options.headers,
      };
    }

    const authHeaders = this.getAuthHeaders();
    if (authHeaders) {
      headers = {
        ...headers,
        ...authHeaders,
      };
    }

    let opts: AxiosRequestConfig = {
      url: options.url,
      withCredentials: true,
      method: options.method,
      headers,
    };

    if (options.data) {
      if (options.data instanceof FormData) {
        delete headers["Content-Type"];
      }
      opts = {
        ...opts,
        data: options.data,
      };
    }
    return opts;
  }

  public post(
    url: string,
    data: IBody | FormData,
    options: RequestOptions = {}
  ) {
    return this.sendRequest({
      url: this.buildUrl(url, options.query),
      method: "POST",
      data,
      ...options,
    });
  }

  public get(url: string, options: RequestOptions = {}) {
    return this.sendRequest({
      url: this.buildUrl(url, options.query),
      method: "GET",
      ...options,
    });
  }

  public put(
    url: string,
    data: IBody | FormData,
    options: RequestOptions = {}
  ) {
    return this.sendRequest({
      url: this.buildUrl(url, options.query),
      method: "PUT",
      data,
      ...options,
    });
  }

  public patch(
    url: string,
    data: IBody | FormData,
    options: RequestOptions = {}
  ) {
    return this.sendRequest({
      url: this.buildUrl(url, options.query),
      method: "PATCH",
      data,
      ...options,
    });
  }

  public del(url: string, options: RequestOptions = {}) {
    return this.sendRequest({
      url: this.buildUrl(url, options.query),
      method: "DELETE",
      ...options,
    });
  }
}
