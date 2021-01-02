import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AuthorCheck } from './authorcheck/AuthorCheck'

import Profile from './pages/profile';
import Login from './pages/login';
import Admin from './pages/admin';
import { authorType, User } from './global';
import { connect } from 'react-redux';
import { Action } from 'redux';



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
              <ProfileContainer />
            </ACKContainer>
          </Route>

          <Route path="/admin" >
            <ACKContainer
              author={authorType.admin} defult='/'>
              <Admin />
            </ACKContainer>
          </Route>

          <Route path="/" >
            <LoginContainer></LoginContainer>
          </Route>

        </Switch>

        {/* 用于实现 js 自主通过 router 跳转的 连接 */}
        <Link to='/profile' id='to/profile' ></Link>
        <Link to='/admin' id='to/admin' ></Link>


      </Router>

    </div>
  );
}


// 定义容器

//AuthorCheck 
let ACKContainer = connect(
  (state: any) => ({ user: state.user })
)(AuthorCheck)

let LoginContainer = connect(
  (state: any) => {
    return ({
      user: state.user,
      dispatch: state.dispatch,
      history: state.history

    })
  }
)(Login)

let ProfileContainer = connect(
  (state: any) => ({
    student: state.student,
    courseFinish: state.courseFinish,
    courseUnfinish: state.courseUnfinish,
  })
)(Profile)

let AdminContainer = connect(
  (state: any) => {
    return ({
      student: state.student,
      courseFinish: state.courseFinish,
      courseUnfinish: state.courseUnfinish,
    })
  }
)(Admin)



export default App;
