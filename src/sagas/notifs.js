// @flow

import { takeEvery } from 'redux-saga/effects';
import type { getNotifFetch, setNotifFetch } from 'reduxTypes/notifs';
import { apiCall } from './api';
import { fetch } from '../actions/api';

const gNotifFetch = function* gNotifFetch(action: getNotifFetch): Generator<*, *, *> {
  const { id } = action.payload;
  const fetchAction = fetch({
    type: action.type,
    fetches: [{
      endPoint: `event/${id}/preferences`,
      method: 'GET',
    }],
  });
  yield apiCall({
    responseTransformers: [
    ],
  })(fetchAction);
};

const sNotifFetch = function* sNotifFetch(action: setNotifFetch): Generator<*, *, *> {
  const {
    id, editEvent, friendJoin, remember,
  } = action.payload;
  const fetchAction = fetch({
    type: action.type,
    fetches: [{
      endPoint: `event/${id}/preferences`,
      method: 'PUT',
      payload: {
        edit_event: editEvent, friend_join: friendJoin, remember,
      },
    }],
  });
  yield apiCall({
    responseTransformers: [
    ],
  })(fetchAction);
};

const watchNotifs = function* watchInterests(): Generator<*, *, *> {
  yield takeEvery('GET_NOTIF_FETCH', gNotifFetch);
  yield takeEvery('SET_NOTIF_FETCH', sNotifFetch);
};

export default watchNotifs;
