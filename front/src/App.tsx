import React, { ReactNode } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Profile from './pages/profile';
import Login from './pages/login';
import Admin from './pages/admin';



interface props {
  name: string
  children: ReactNode[] | ReactNode
}



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
