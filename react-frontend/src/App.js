import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import './App.css';

const App = () => {

  return (
    <div className="main">
      <Router>
        <div className="navbar">
          <ul>
            <li>
              <Link to="/login" className="navbar-item">Login</Link>
            </li>
            <li>
              <Link to="register" className="navbar-item">Register</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
