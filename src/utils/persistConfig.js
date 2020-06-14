import storage from 'redux-persist/lib/storage';

export default {
  key: 'root',
  storage,
  whitelist: ['user'],
  debug: __DEV__,
};
