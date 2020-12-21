import React from 'react';
import './App.css';
import Home from "./pages/home/home";
import Fixtures from "./pages/fixtures/fixtures";
import Stats from "./pages/stats/stats";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from "./components/navbar/navbar"

const App = () => {
  return (
        <Router>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/fixtures">
                <Fixtures/>
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
            </Switch>
        </Router>
  );
}

export default App;
