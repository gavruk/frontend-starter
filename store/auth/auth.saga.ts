import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeEvery, put, call } from "redux-saga/effects";
import Router from 'next/router';

import { setToken } from '../../helpers/storage';
import { authActions } from "./auth.slice";
import * as types from './types';
import api from "./auth.api";

export function* signupWorker(
  data: PayloadAction<types.ISignupRequest>
) {
  try {
    const { accessToken } = yield call(api.signup, data.payload);
    if (accessToken) {
      setToken(accessToken);
    }
    yield getMeWorker();
    yield call(Router.push, '/');
  } catch (err: any) {

  }
}

export function* loginWorker(
  data: PayloadAction<types.ILoginRequest>
) {
  try {
    const { accessToken } = yield call(api.login, data.payload);
    if (accessToken) {
      setToken(accessToken);
    }
    yield getMeWorker();
    yield call(Router.push, '/');
  } catch (err: any) {

  }
}

export function* logoutWorker() {
  try {
    setToken(null);
    yield call(Router.push, '/auth/login');
  } catch (err: any) {
  }
}

export function* getMeWorker() {
  try {
    const response = yield call(api.getMe);
    yield put(authActions.getMeSuccess(response));
  } catch (err: any) {
    yield call(Router.push, '/auth/login');
  }
}

export function* authWatcher() {
  yield all([
    takeEvery(authActions.signup, signupWorker),
    takeEvery(authActions.login, loginWorker),
    takeEvery(authActions.logout, logoutWorker),
    takeEvery(authActions.getMe, getMeWorker),
  ]);
}
