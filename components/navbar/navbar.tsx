import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";

import { getUser, authActions } from "../../store/auth/auth.slice";

import styles from './navbar.module.scss';

export default function Navbar() {
  const user = useSelector(getUser);
  console.log(user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <Image src="/images/logo.svg" height="30" width="30" alt="logo" />
            </a>
          </Link>
          <span className="navbar-burger burger" data-target="navbarMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenu" className="navbar-menu">
          <div className="navbar-start">
            {user && <Link href="/">
              <a className="navbar-item">
                Dashboard
              </a>
            </Link>}
            {user && <Link href="/products">
              <a className="navbar-item">
                Products
              </a>
            </Link>}
          </div>
          <div className="navbar-end">
            <Link href="/features">
              <a className="navbar-item">
                Features
              </a>
            </Link>

            {user ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  {user.firstName}
                </a>

                <div className="navbar-dropdown">
                  <Link href="/user/profile">
                    <a className="navbar-item">
                      Profile
                    </a>
                  </Link>
                  <a className="navbar-item" onClick={logout}>
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Link href="/auth/login">
                      <a className="button is-light">
                        Log in
                      </a>
                    </Link>
                    <Link href="/auth/signup">
                      <a className="button is-primary">
                        Sign up
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
