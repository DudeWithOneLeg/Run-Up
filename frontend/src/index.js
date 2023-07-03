import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as sessionActions from "./store/session";
import { restoreCSRF, csrfFetch } from './store/csrf';
import configureStore from './store';
import { ModalProvider, Modal } from './context/Modal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF()
  window.store = store;
  window.csrfFetch = csrfFetch
  window.sessionActions = sessionActions
}

function Root() {
  return (
    <ModalProvider>
       <Provider store={store}>
      <BrowserRouter>
        <App />
        <Modal />
      </BrowserRouter>
    </Provider>
    </ModalProvider>

  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
