/* /components/Layout.js */

import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "./context";
import { logout } from "./auth"
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Layout = (props) => {
  const title = "Welcome to SAGE Restaurant";
  const { setUser } = useContext(AppContext);
  const router = useRouter();

  const token = Cookies.get('token');
  const detailUser = Cookies.get('user');
  const userDetail = detailUser ? JSON.parse(detailUser) : {};

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
          {token && (
              <Link href="/">
                <a className="navbar-brand">Home</a>
              </Link>
          )}
          </NavItem>
          <NavItem className="ml-auto">
            {token ? (
              <b className="text-white">Hi, {userDetail.username}</b>
            ) : (
              <Link href="/register">
                <a className="nav-link"> Sign up</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {token ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  Logout
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">Sign in</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;