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


// 建立 AuthorCheck 容器组件
let mapStatesToProps = (state: any) => {
  return {
    user: state.user,
  }
}
let ACKContainer = connect(mapStatesToProps)(AuthorCheck)


interface props {
  user: User
}

function App(props: props) {
  console.log(props);

  return (
    <div>
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
            <Login></Login>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}


export default App;
