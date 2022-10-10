import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";

import { authSlice } from "./auth/auth.slice";
import { productSlice } from "./product/product.slice";
import { modalSlice } from "./modal/modal.slice";

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [productSlice.name]: productSlice.reducer,
      [modalSlice.name]: modalSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ 
        thunk: false,
        serializableCheck: false,
      }).prepend(sagaMiddleware);
    },
    devTools: true,
  });
  sagaMiddleware.run(rootSaga);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
