import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavigationLink from './shared/NavigationLink';
import { getAuthContext } from '../context/AuthContext';
import "./css/header.css"

const Header = () => {
  const auth = getAuthContext();

  return (
    <AppBar className="header-toolbar">
      <Toolbar className="header-toolbar">
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#6D5147"
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <div className="nav-links">
              <NavigationLink
                className="nav-link"
                bg="white"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                className="nav-link"
                bg="white"
                to="/signup"
                text="Signup"
                textColor="black"
              />
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
