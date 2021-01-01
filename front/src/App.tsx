import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthorCheck } from './authorcheck/AuthorCheck'

import Profile from './pages/profile';
import Login from './pages/login';
import Admin from './pages/admin';
import { authorType, User } from './global';
import { connect } from 'react-redux';
import { Action } from 'redux';


// 建立 AuthorCheck 容器组件
let mapStatesToProps = (state: any) => {
  return {
    user: state.user,
  }
}
let ACKContainer = connect(mapStatesToProps)(AuthorCheck)


interface props {
  user: User
  dispatch: (arg: Action) => void
}

function App(props: props) {
  console.log("APP:", props);

  return (
    <div className='APP'>
      <Router>
        <Switch>

          <Route path="/profile" >
            <ACKContainer
              author={authorType.students} defult='/'>
              <Profile />
            </ACKContainer>
          </Route>

          <Route path="/admin" >
            <ACKContainer
              author={authorType.admin} defult='/'>
              <Admin />
            </ACKContainer>
          </Route>

          <Route path="/" >
            <Login user={props.user} dispatch={props.dispatch}></Login>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}


export default App;
