import './css/App.css';
import { ReactNode } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthorCheck } from './authorcheck/AuthorCheck'

import Profile from './pages/profile';
import Login from './pages/login';
import Admin from './pages/admin';
import { User } from './global';



interface props {
  user: User
}


function App(props: props) {
  console.log(props);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
