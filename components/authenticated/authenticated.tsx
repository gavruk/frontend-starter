import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getUser, authActions } from "../../store/auth/auth.slice";

import Spinner from "../spinner/spinner";

import styles from './authenticated.module.scss';

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
    return (
      <div className={styles.spinnerContainer}>
        <Spinner className={styles.spinner} />
      </div>
    );
  }
  return React.cloneElement(children)
}
