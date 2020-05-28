import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Page from './component/Page'
import MapEx from './Ver16/MapsExample'
import {Provider} from 'react-redux'
import { applyMiddleware,createStore}from 'redux'
import ReduxThunk from 'redux-thunk'
import reducer from './reducer'
import * as serviceWorker from './serviceWorker';
const store = createStore(reducer,{},applyMiddleware(ReduxThunk))
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Page/>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
