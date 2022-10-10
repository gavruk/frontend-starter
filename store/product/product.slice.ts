import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { AppState } from "../store";
import * as types from './types';

export interface ProductState {
  products?: types.IProduct[];
}

const initialState: ProductState = {
  products: undefined,
};

// Actual Slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    create(
      state: ProductState,
      action: PayloadAction<types.ICreateProductRequest>,
    ) {
      return state;
    },
    delete(
      state: ProductState,
      action: PayloadAction<types.IDeleteProductRequest>,
    ) {
      return state;
    },
    list() {},
    listSuccess(
      state: ProductState,
      action: PayloadAction<types.IProduct[]>,
    ) {
      return {
        ...state,
        products: action.payload,
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

export const getProducts = (state: AppState) => state.product.products;

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
