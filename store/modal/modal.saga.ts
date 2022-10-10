import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeEvery, put, delay } from "redux-saga/effects";

import { modalActions } from "./modal.slice";

export function* hideWorker(data: PayloadAction<{ id: string }>) {
  yield delay(100);
  yield put(modalActions.remove(data.payload));
}

export function* modalWatcher() {
  yield all([takeEvery(modalActions.hide, hideWorker)]);
}
