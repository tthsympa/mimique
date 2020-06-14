import { all } from 'redux-saga/effects';
import watchUser from './user';
import watchEvents from './events';
import watchInterests from './interests';
import watchNotifs from './notifs';

const rootSaga = function* rootSaga() {
  yield all([
    watchUser(),
    watchEvents(),
    watchInterests(),
    watchNotifs(),
  ]);
};

export default rootSaga;
