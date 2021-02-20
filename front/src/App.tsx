import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import AuthorCheck from './authorcheck/AuthorCheck'
import Profile from './pages/Profile';
import Login from './pages/login';
import Admin from './pages/Admin';
import Maintain from './pages/Admin/Maintain';
import GradeDetail from './pages/Profile/GradeDetail';
import Graph from './pages/Admin/Graph';
import { authorType, User } from './global';
import { Action } from 'redux';
import React from 'react';



interface props {
  user: User
  dispatch: (arg: Action) => void
}

function App(props: props) {

  return (
    <div className='APP'>

      {/* ! 路由设定 */}
      <Router>
        <Switch>
          <Route path="/profile/gradedetail" >
            <AuthorCheck
              author={authorType.students} defult='/'>
              <GradeDetail />
            </AuthorCheck>
          </Route>

          <Route path="/profile" >
            <AuthorCheck
              author={authorType.students} defult='/'>
              <Profile />
            </AuthorCheck>
          </Route>

          <Route path="/admin/maintain" >
            <AuthorCheck
              author={authorType.admin} defult='/'>
              <Maintain />
            </AuthorCheck>
          </Route>

          <Route path="/admin/graph" >
            <AuthorCheck
              author={authorType.admin} defult='/'>
              <Graph />
            </AuthorCheck>
          </Route>

          <Route path="/admin" >
            <AuthorCheck
              author={authorType.admin} defult='/'>
              <Admin />
            </AuthorCheck>
          </Route>

          <Route path="/" >
            <Login />
          </Route>

        </Switch>

        {/* 用于实现 js 自主通过 router 跳转的 连接 */}
        <Link to='/profile' id='to/profile' ></Link>
        <Link to='/profile/gradedetail' id='to/profile/gradedetail' ></Link>
        <Link to='/admin' id='to/admin' ></Link>
        <Link to='/admin/maintain' id='to/admin/maintain' ></Link>
        <Link to='/admin/graph' id='to/admin/graph' ></Link>

      </Router>

    </div>
  );
}


// 定义容器











export default App;
