// @flow

import type { NotifsState, NotifsAction } from 'reduxTypes/notifs';

const initialState: NotifsState = {
  data: [],
  isLoading: true,
  error: null,
};

export default (state: NotifsState = initialState, action: NotifsAction): NotifsState => {
  switch (action.type) {
    case 'GET_NOTIF_FETCH':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_NOTIF_FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case 'GET_NOTIF_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case 'SET_NOTIF_FETCH':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_NOTIF_FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case 'SET_NOTIF_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
