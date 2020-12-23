import React from 'react';
import './App.scss';
import Home from "./pages/home/home";
import Fixtures from "./pages/fixtures/fixtures";
import Stats from "./pages/stats/stats";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from "./components/navbar/navbar"
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import {useToken} from './helpers/useToken';


const App = () => {
  const { token, setToken } = useToken();

  if(token === null){
    return (
      <Router>
          <Switch>
            <Route path="/login">
              <Login setToken={setToken}/>
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <Login setToken={setToken}/>
            </Route>
          </Switch>
      </Router>
    );
  }

  return (
        <Router>
            <NavBar setToken={setToken}/>
            <Switch>
              <Route path="/home">
                <Home teamID={token.teamID} />
              </Route>
              <Route path="/fixtures">
                <Fixtures/>
              </Route>
              <Route path="/stats" >
                <Stats teamID={token.teamID} />
              </Route>
            </Switch>
        </Router>
  );
}

export default App;
