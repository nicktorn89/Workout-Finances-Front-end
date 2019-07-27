import { Store as ReduxStore, Action, Middleware, applyMiddleware, createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from '../modules/reducer';
import { MainStore } from '../modules/types';
import { FSA } from '@gostgroup/redux-modus';

function createStore(): ReduxStore<MainStore> {
  const middlewares: Middleware[] = [
    thunk,
    promiseMiddleware(),
  ];

  return _createStore<MainStore, FSA<any, any>, {}, {}>(
    reducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
}

export default createStore;
