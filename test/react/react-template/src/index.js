import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import store from '@/stores'
import * as serviceWorker from '@/utils/serviceWorker'

ReactDOM.render(
  <Provider {...store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
