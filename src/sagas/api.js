// @flow

import { put, select, call, all } from 'redux-saga/effects';
import reduce from 'lodash/reduce';
import type { Fetch, FetchSuccess, FetchFailure, FetchOption } from 'reduxTypes/api';
import FetchApi from '../services/FetchApi';
import { fetchStart, fetchSuccess, fetchFailure } from '../actions/api';
import { loggedOut } from '../actions/user';

type ExtraOptions = {
  responseTransformers?: Function[],
  errorTransformer?: Function,
};

// TODO: Type the state
export function tokenSelector(state: Object) {
  return state.user.user.authToken;
}

/**
 * Retrieves data from a passed selector and dispatch an START action with that information,
 * then calls the api with the information merged with the payload,
 * if the api call succedded, dispatches a SUCCESS action with the response on the payload,
 * otherwise, dispatches a FAILURE action with the error.
 * @param {Options} options
 * @return {function} Generator function that receives the action from the saga
 */
export function apiCall(extraOptions: ExtraOptions = {}) {
  const { responseTransformers = [], errorTransformer } = extraOptions;
  return function* apiResponse(action: Fetch): Generator<*, *, *> {
    const token = yield select(tokenSelector);

    yield put(fetchStart(action.type));

    const fetchCalls = action.fetches.map((fetch: FetchOption) => {
      const {
        endPoint,
        method,
        payload,
        errorAlert,
        extraHeaders,
      } = fetch;

      return call(
        FetchApi,
        endPoint,
        method,
        payload,
        errorAlert,
        extraHeaders,
        token,
      );
    });

    const responses = yield all(fetchCalls);
    const firstError = responses.find(r => r.error);

    if (firstError) {
      yield put(fetchFailure(action.type, errorTransformer
        ? errorTransformer(firstError)
        : firstError));

      if (firstError.error.code === 4003) { // Authentication token has been revoked
        yield put(loggedOut());
      }
    } else {
      const response = reduce(
        responses.map(r => r.response),
        (acc, currentResponse, idx) => {
          if (responseTransformers[idx]) {
            return { ...acc, ...responseTransformers[idx](currentResponse) };
          }
          return { ...acc, ...currentResponse };
        },
        {},
      );
      yield put(fetchSuccess(action.type, response));
    }
  };
}

/**
 * Redirect FetchSuccess of FetchFailure to another action with a put effect.
 *
 * @export
 * @param {Function} actionCreator
 * @param {*} actionArg Can be a function (to select the part of the payload
 * who will be sent to the action creator) or anyting else who will be sent to the action creator
 * @return Generator function that receives the action from the saga
 */
export function apiRedirect(actionCreator: Function, actionArg: any) {
  return function* response(action: FetchSuccess | FetchFailure): Generator<*, *, *> {
    const payload = (typeof actionArg === 'function')
      ? actionArg(action)
      : actionArg;
    yield put(actionCreator(payload));
  };
}
