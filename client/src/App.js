import Layout from './Components/Layout'
import Users from './Components/Users'
import Spaces from './Components/Spaces'
import Desks from './Components/Desks'
import Reservations from './Components/Reservations'
import Login from './Components/Login'

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App container-sm">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Layout>
              <Users />
            </Layout>
          </Route>
          <Route path="/spaces">
            <Layout>
              <Spaces />
            </Layout>
          </Route>
          <Route path="/desks">
            <Layout>
              <Desks />
            </Layout>
          </Route>
          <Route path="/reservations">
            <Layout>
              <Reservations />
            </Layout>
          </Route>
          <Route path="/">
            <Layout>
              <Home />
            </Layout>
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
