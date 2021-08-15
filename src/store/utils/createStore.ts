import { Store as ReduxStore, Middleware, applyMiddleware, createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from '../modules/reducer';
import { MainStore } from '../modules/types';

function createStore(): ReduxStore<MainStore> {
  const middlewares: Middleware[] = [
    thunk,
  ];

  return _createStore<MainStore, { type: string; error?: any }, {}, {}>(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
}

export default createStore;
