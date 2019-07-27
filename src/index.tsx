import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import Routes from './routes';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createStore from './store/utils/createStore';

import './theme/reset.css';

const store = createStore();
const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <StoreProvider store={store}>
      <Routes />
    </StoreProvider>
  </AppContainer>
  ,
  rootEl,
);
