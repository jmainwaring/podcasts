import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import GroupCreate from './GroupCreate';
import MembershipChange from './MembershipChange';

// https://bezkoder.com/react-node-express-postgresql/

// Components - https://bezkoder.com/react-pagination-material-ui/

export default () => {
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              JakeRocks
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/groupcreate"} className="nav-link">
                New group
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/membershipchange"} className="nav-link">
                Modify group
                </Link>
              </li>
            </div>
          </nav>
  
          <div className="container mt-3">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/groupcreate" exact component={GroupCreate} />
              <Route path="/membershipchange" exact component={MembershipChange} />
            </Switch>
          </div>
        </div>
      );
  };
