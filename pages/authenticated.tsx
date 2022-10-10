import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getUser, authActions } from "../store/auth/auth.slice";

interface IProps {
  children: React.ReactElement;
}

export default function Authenticated({ children }: IProps) {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(authActions.getMe());
  }, [dispatch]);

  if (user === undefined) {
    return <h1>Loading...</h1>;
  }
  return React.cloneElement(children)
}
