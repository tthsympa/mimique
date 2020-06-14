// @flow

import type { Fetch, FetchStart, FetchSuccess, FetchFailure } from 'reduxTypes/api';

function removeDuplicateFetch(actionName: string) {
  if (actionName.endsWith('_FETCH')) {
    return removeDuplicateFetch(actionName.slice(0, -6));
  }
  return actionName;
}

export const fetch = (fetchOptions: Fetch): Fetch => ({
  ...fetchOptions,
  type: `${fetchOptions.type}_FETCH`,
});

export const fetchStart = (actionType: string): FetchStart => ({
  type: `${removeDuplicateFetch(actionType)}_FETCH_START`,
});

export const fetchSuccess = (actionType: string, payload: Object): FetchSuccess => ({
  type: `${removeDuplicateFetch(actionType)}_FETCH_SUCCESS`,
  payload,
});

export const fetchFailure = (actionType: string, payload: Object): FetchFailure => ({
  type: `${removeDuplicateFetch(actionType)}_FETCH_FAILURE`,
  payload,
});
