import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <nav
      class="navbar fixed-top navbar-expand-lg bg-dark bg-body-tertiary"
      data-bs-theme="dark"
      style={{ height: 80 }}
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          SINHALA - ENGLISH TRANSLATOR
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">
                Extract Keywords
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Find Synonyms & Antonyms
              </a>
            </li>
            <li class="nav-item">
              <Link to="/Posts" className="nav-link">
                Articles
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link">Notepad</a>
            </li>
          </ul>
        </div>
        {user ? (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Link to="/auth">
            <button type="button" className="btn btn-secondary btn-sm">
              Login / Signup
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
