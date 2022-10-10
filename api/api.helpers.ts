import qs from "qs";
import { IQuery } from "./types";

export function buildQueryString(query: IQuery): string {
  let queryString = "";
  const partsLength = Object.keys(query).length;
  if (partsLength > 0) {
    queryString = `?${qs.stringify(query)}`;
  }

  return queryString;
}

export function getQueryObject() {
  const queryString: any = window.location.search
    ? window.location.search.slice(1)
    : "";

  return qs.parse(queryString) as unknown;
}
