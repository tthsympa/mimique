import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { uncombinedRootReducer } from '../reducers';
import rootSaga from '../sagas';
import persistConfig from './persistConfig';

const configureStore = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();
  const persistRootReducer = persistCombineReducers(persistConfig, uncombinedRootReducer);

  const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

  const logger = createLogger({
    predicate: () => isDebuggingInChrome,
    collapsed: true,
    duration: true,
  });

  const store = createStore(
    persistRootReducer,
    preloadedState,
    applyMiddleware(
      sagaMiddleware,
      logger,
    ),
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { persistor, store };
};

export const { persistor, store } = configureStore();
