import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createStore from './store/utils/createStore';

import './reset.css';
import Main from './modules/Main';

const store = createStore();
const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <StoreProvider store={store}>
      <Main />
    </StoreProvider>
  </AppContainer>
  ,
  rootEl,
);
