import "../styles/global.scss";

import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

import ModalContainer from "../components/modal/modal-container";
import Authenticated from "./authenticated";
import { wrapper } from "../store/store";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      {props.pageProps.protected 
        ? (
          <Authenticated>
            <>
              <ModalContainer />
              <Component {...props.pageProps} />
            </>
          </Authenticated>
        )
        : (
          <>
            <ModalContainer />
            <Component {...props.pageProps} />
          </>
        )}
    </Provider>
  );
}
