import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import user from './user';
import events from './events';
import interests from './interests';
import notifs from './notifs';

export const uncombinedRootReducer = {
  form: formReducer,
  user,
  events,
  interests,
  notifs,
};

export default combineReducers(uncombinedRootReducer);
