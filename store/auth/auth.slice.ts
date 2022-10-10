import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppState } from "../store";
import * as types from './types';

export interface AuthState {
  token?: string,
  data?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const initialState: AuthState = {
  token: undefined,
  data: undefined,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getMe() {
    },
    getMeSuccess(
      state: AuthState, 
      action: PayloadAction<types.IGetMeResponse>,
    ) {
      return {
        ...state,
        data: action.payload,
      };
    },
    signup(
      state: AuthState, 
      action: PayloadAction<types.ISignupRequest>,
    ) {},
    login(
      state: AuthState, 
      action: PayloadAction<types.ILoginRequest>,
    ) {},
    logout(state: AuthState) {
      return {
        ...state,
        token: null,
        data: null,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const getIsAuthenticated = (state: AppState) => !!state.auth.token;
export const getUser = (state: AppState) => state.auth.data;

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
