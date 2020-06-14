// @flow

import type {
  getNotifFetch,
  getNotifFetchSuccess,
  getNotifFetchFailure,
  setNotifFetch,
  setNotifFetchSuccess,
  setNotifFetchFailure,
} from 'reduxTypes/notifs';

export const gNotifsFetch = (id): getNotifFetch => ({
  type: 'GET_NOTIF_FETCH',
  payload: {
    id,
  },
});

export const gNotifFetchSuccess = (data): getNotifFetchSuccess => ({
  type: 'GET_NOTIF_FETCH_SUCCESS',
  payload: {
    data,
  },
});

export const gNotifFetchFailure = (): getNotifFetchFailure => ({
  type: 'GET_NOTIF_FETCH_FAILURE',
  payload: {},
});

export const sNotifFetch = (id, editEvent, friendJoin, remember): setNotifFetch => ({
  type: 'SET_NOTIF_FETCH',
  payload: {
    id,
    editEvent,
    friendJoin,
    remember,
  },
});

export const sNotifFetchSuccess = (data): setNotifFetchSuccess => ({
  type: 'SET_NOTIF_FETCH_SUCCESS',
  payload: {
    data,
  },
});

export const sNotifFetchFailure = (): setNotifFetchFailure => ({
  type: 'SET_NOTIF_FETCH_FAILURE',
  payload: {},
});
