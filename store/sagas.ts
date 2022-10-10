import { all, fork } from "redux-saga/effects";

import { authWatcher } from "./auth/auth.saga";
import { productWatcher } from "./product/product.saga";
import { modalWatcher } from "./modal/modal.saga";

const rootSaga = function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(productWatcher),
    fork(modalWatcher),
  ]);
};
export default rootSaga;
