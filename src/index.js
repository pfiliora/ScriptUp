import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import configureStore from './tools/configureStore'
import './index.css';

// let initialState = {
//   books: [],
//   user:{}
// }

const store = configureStore()
// console.log(store.getState())
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)