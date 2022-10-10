import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeEvery, put, call } from "redux-saga/effects";

import { productActions } from "./product.slice";
import * as types from './types';
import api from "./product.api";

export function* createWorker(
  data: PayloadAction<types.ICreateProductRequest>
) {
  try {
    yield call(api.create, data.payload);
    yield put(productActions.list());
  } catch (err: any) {

  }
}

export function* deleteWorker(
  data: PayloadAction<types.IDeleteProductRequest>
) {
  try {
    yield call(api.delete, data.payload);
    yield put(productActions.list());
  } catch (err: any) {

  }
}

export function* listWorker() {
  try {
    const data = yield call(api.list);
    yield put(productActions.listSuccess(data));
  } catch (err: any) {

  }
}

export function* productWatcher() {
  yield all([
    takeEvery(productActions.create, createWorker),
    takeEvery(productActions.delete, deleteWorker),
    takeEvery(productActions.list, listWorker),
  ]);
}
