import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import { createStore, Action } from 'redux'

import './css/index.css';
import 'antd/dist/antd.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './reducer/reducer'


let store = createStore(reducer)

let mapStatesToProps = (state: any) => {
  return {
    States: state,
    user: state.user,
  }
}

let AppContainer = connect(mapStatesToProps)(App)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
