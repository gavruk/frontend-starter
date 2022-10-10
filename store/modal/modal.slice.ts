import * as React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IStackItem, IModalProviderState } from "./types";

interface IAction {
  id: string;
  dependant?: boolean;
  component: React.ReactElement;
}

export const initialState: IModalProviderState = {
  stack: [],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show(state: IModalProviderState, action: PayloadAction<IAction>) {
      const targetModal = state.stack.find(
        (modal: IStackItem) => modal.id === action.payload.id
      );

      if (!targetModal) {
        return {
          ...state,
          stack: [
            ...state.stack,
            {
              id: action.payload.id,
              component: action.payload.component,
              isOpened: true,
              dependant: action.payload.dependant,
            } as IStackItem,
          ],
        };
      }

      return {
        ...state,
        stack: [
          ...state.stack.filter(
            (modal) =>
              state.stack.indexOf(modal) <
              state.stack.indexOf(targetModal as IStackItem)
          ),
          {
            ...targetModal,
            component: action.payload.component,
            isOpened: true,
            dependant: action.payload.dependant,
          } as IStackItem,
          ...state.stack.filter(
            (modal) =>
              state.stack.indexOf(modal) >
              state.stack.indexOf(targetModal as IStackItem)
          ),
        ],
      };
    },

    hide(state: IModalProviderState, action: PayloadAction<{ id: string }>) {
      const targetModal = state.stack.find(
        (modal: IStackItem) => modal.id === action.payload.id
      );

      if (!targetModal) {
        return state;
      }

      return {
        ...state,
        stack: [
          ...state.stack.filter(
            (modal) =>
              state.stack.indexOf(modal) <
              state.stack.indexOf(targetModal as IStackItem)
          ),
          {
            ...targetModal,
            isOpened: false,
          },
          ...state.stack.filter(
            (modal) =>
              state.stack.indexOf(modal) >
              state.stack.indexOf(targetModal as IStackItem)
          ),
        ],
      };
    },

    remove(state: IModalProviderState, action: PayloadAction<{ id: string }>) {
      return {
        ...state,
        stack: state.stack.filter(
          (modal) => modal.id !== action.payload.id && !modal.dependant
        ),
      };
    },
  },
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
