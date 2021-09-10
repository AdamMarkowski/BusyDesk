import Users from './Components/Users'
import Spaces from './Components/Spaces'
import Desks from './Components/Desks'
import Reservations from './Components/Reservations'

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App container-sm">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="http://onet.pl">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/spaces">Spaces</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/desks">Desks</Link>
                </li>
                <li class="nav-item">
                  <Link className="nav-link" to="/reservations">Reservations</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/spaces">
            <Spaces />
          </Route>
          <Route path="/desks">
            <Desks />
          </Route>
          <Route path="/reservations">
            <Reservations />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
