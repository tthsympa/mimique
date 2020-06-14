// @flow

import { takeEvery, put, call } from 'redux-saga/effects';
import type {
  LogIn,
  LogOut,
  ProvidersFetch,
  EraseUser,
  AddProvider,
  DeleteProvider,
  SendUserLocation,
  ChangeMail,
  InitExpoNotif,
  GetGeneralNotifConfig,
  ChangeGeneralNotifConfig,
  GetEventDistanceMax,
  ChangeEventDistanceMax,
  ToggleDispoStatus,
} from 'reduxTypes/user';
import {
  loggedIn,
  logInError,
  loggedOut,
  providersFetch,
  providersFetchSuccess,
  providersFetchFailure,
  addProviderFailure,
  deleteProviderFailure,
  changeMailFailure,
  changeMailSuccess,
  initExpoNotifSuccess,
  initExpoNotifFailure,
  getGeneralNotifConfigSuccess,
  getGeneralNotifConfigFailure,
  changeGeneralNotifConfigSuccess,
  changeGeneralNotifConfigFailure,
  getEventDistanceMaxSuccess,
  getEventDistanceMaxFailure,
  changeEventDistanceMaxSuccess,
  changeEventDistanceMaxFailure,
  toggleDispoStatusSuccess,
  toggleDispoStatusFailure,
} from '../actions/user';
import callSocialConnect from '../services/SocialConnect';
import { apiCall, apiRedirect } from './api';
import { fetch } from '../actions/api';

export const logIn = function* logIn(action: LogIn): Generator<*, *, *> {
  const tmpCredential = yield call(callSocialConnect, action.source);
  const credential = typeof tmpCredential === 'string' ? { accessToken: tmpCredential } : tmpCredential;
  if (credential && credential.accessToken) {
    yield put(fetch({
      type: action.type,
      fetches: [{
        endPoint: `auth/login/${action.source}`,
        method: 'POST',
        payload: credential,
        errorAlert: false,
      }],
    }));
  } else {
    yield put(logInError('cancel'));
  }
};

export const logOut = function* logOut(action: LogOut): Generator<*, *, *> {
  yield put(fetch({
    type: action.type,
    fetches: [{
      endPoint: 'auth/logout',
      method: 'POST',
      errorAlert: false,
    }],
  }));
};

export const getProviders = function* accountsFetch(action: ProvidersFetch): Generator<*, *, *> {
  const fetchAction = fetch({
    type: action.type,
    fetches: [{
      endPoint: 'auth/my-social-providers',
      method: 'GET',
      errorAlert: false,
    }],
  });
  yield apiCall({
    responseTransformers: [
      payload => [payload],
    ],
  })(fetchAction);
};

export const addProvider = function* addProvider(action: AddProvider): Generator<*, *, *> {
  const accessToken = yield call(callSocialConnect, action.source);
  if (accessToken) {
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: `auth/login/${action.source}`,
        method: 'POST',
        authToken: action.authToken,
        payload: { accessToken },
        errorAlert: false,
      }],
    });
    yield apiCall({
      responseTransformers: [
      ],
    })(fetchAction);
  }
};

export const deleteProvider = function* deleteProvider(action: DeleteProvider): Generator<*, *, *> {
  yield put(fetch({
    type: action.type,
    fetches: [{
      endPoint: `auth/my-social-provider/${action.id}`,
      method: 'DELETE',
      errorAlert: false,
    }],
  }));
};

export const eraseUser = function* eraseUser(action: EraseUser): Generator<*, *, *> {
  yield put(fetch({
    type: action.type,
    fetches: [{
      endPoint: 'user/account',
      method: 'DELETE',
      errorAlert: false,
    }],
  }));
};

export const sendUserLocation =
  function* sendUserLocation(action: SendUserLocation): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: 'user/account/location',
        method: 'PUT',
        payload: {
          latitude: action.location.latitude,
          longitude: action.location.longitude,
        },
      }],
    });
    yield apiCall()(fetchAction);
  };

export const changeMail =
  function* changeMail(action: ChangeMail): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: 'user/account/email',
        method: 'PUT',
        payload: {
          email: action.mail,
        },
      }],
    });
    yield apiCall({
      responseTransformers: [
        // eslint-disable-next-line
        mail => [action.mail],
      ],
    })(fetchAction);
  };

export const initNotif = function* initNotif(action: InitExpoNotif): Generator<*, *, *> {
  yield put(fetch({
    type: action.type,
    fetches: [{
      endPoint: 'user/notification/token',
      method: 'POST',
      payload: {
        value: action.token,
      },
    }],
  }));
};

export const getGeneralNotifConfig =
  function* getGeneralNotifConfig(action: GetGeneralNotifConfig): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: 'user/notification',
        method: 'GET',
        errorAlert: false,
      }],
    });
    yield apiCall({
      responseTransformers: [
      ],
    })(fetchAction);
  };

export const changeGeneralNotifConfig =
  function* changeGeneralNotifConfig(action: ChangeGeneralNotifConfig): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: `user/notification/${action.typeNotif}`,
        method: 'POST',
        errorAlert: false,
      }],
    });
    yield apiCall({
      responseTransformers: [
      ],
    })(fetchAction);
  };

export const getEventMaxDistance =
  function* getEventMaxDistance(action: GetEventDistanceMax): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: 'user/preference',
        method: 'GET',
        errorAlert: false,
      }],
    });
    yield apiCall({
      responseTransformers: [
      ],
    })(fetchAction);
  };

export const changeEventDistanceMax =
  function* changeEventDistanceMax(action: ChangeEventDistanceMax): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: 'user/preference',
        method: 'PUT',
        payload: {
          event_search_max_perimeter: action.distance,
        },
        errorAlert: false,
      }],
    });
    yield apiCall({
      responseTransformers: [
      ],
    })(fetchAction);
  };

export const toggleDispoStatus =
  function* toggleDispoStatus(action: ToggleDispoStatus): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: `/user/disponibilities/${action.payload.id}`,
        method: 'PATCH',
        payload: {
          enabled: action.payload.status,
        },
        errorAlert: false,
      }],
    });
    yield apiCall({
      responseTransformers: [
      ],
    })(fetchAction);
  };

const watchUser = function* watchUser(): Generator<*, *, *> {
  yield takeEvery('LOG_IN', logIn);
  yield takeEvery('LOG_IN_FETCH', apiCall());
  yield takeEvery('LOG_IN_FETCH_SUCCESS', apiRedirect(loggedIn, a => a.payload.user));
  yield takeEvery('LOG_IN_FETCH_FAILURE', apiRedirect(logInError, 'error'));
  yield takeEvery('LOG_OUT', logOut);
  yield takeEvery('LOG_OUT_FETCH', apiCall());
  yield takeEvery('LOG_OUT_FETCH_SUCCESS', apiRedirect(loggedOut));
  yield takeEvery('LOG_OUT_FETCH_FAILURE', apiRedirect(loggedOut));
  yield takeEvery('PROVIDERS_FETCH', getProviders);
  yield takeEvery('PROVIDERS_FETCH_FETCH', apiCall());
  yield takeEvery('PROVIDERS_FETCH_FETCH_SUCCESS', apiRedirect(providersFetchSuccess));
  yield takeEvery('PROVIDERS_FETCH_FETCH_FAILURE', apiRedirect(providersFetchFailure, 'error with fetch accounts'));
  yield takeEvery('ADD_PROVIDER', addProvider);
  yield takeEvery('ADD_PROVIDER_FETCH', apiCall());
  yield takeEvery('ADD_PROVIDER_FETCH_SUCCESS', apiRedirect(providersFetch));
  yield takeEvery('ADD_PROVIDER_FETCH_FAILURE', apiRedirect(addProviderFailure, 'error'));
  yield takeEvery('DELETE_PROVIDER', deleteProvider);
  yield takeEvery('DELETE_PROVIDER_FETCH', apiCall());
  yield takeEvery('DELETE_PROVIDER_FETCH_SUCCESS', apiRedirect(providersFetch));
  yield takeEvery('DELETE_PROVIDER_FETCH_FAILURE', apiRedirect(deleteProviderFailure, 'error while unlinking account'));
  yield takeEvery('ERASE_USER', eraseUser);
  yield takeEvery('ERASE_USER_FETCH', apiCall());
  yield takeEvery('ERASE_USER_FETCH_SUCCESS', apiRedirect(loggedOut));
  yield takeEvery('ERASE_USER_FETCH_FAILURE', apiRedirect(loggedOut));
  yield takeEvery('SEND_USER_LOCATION_FETCH', sendUserLocation);
  yield takeEvery('CHANGE_MAIL', changeMail);
  yield takeEvery('CHANGE_MAIL_FETCH', apiCall());
  yield takeEvery('CHANGE_MAIL_FETCH_SUCCESS', apiRedirect(changeMailSuccess, a => a.payload[0]));
  yield takeEvery('CHANGE_MAIL_FETCH_FAILURE', apiRedirect(changeMailFailure, 'error while changing mail'));
  yield takeEvery('INIT_EXPO_NOTIF', initNotif);
  yield takeEvery('INIT_EXPO_NOTIF_FETCH', apiCall());
  yield takeEvery('INIT_EXPO_NOTIF_FETCH_SUCCESS', apiRedirect(initExpoNotifSuccess));
  yield takeEvery('INIT_EXPO_NOTIF_FETCH_FAILURE', apiRedirect(initExpoNotifFailure, 'error while initing notifications'));
  yield takeEvery('GET_GENERAL_NOTIF_CONFIG', getGeneralNotifConfig);
  yield takeEvery('GET_GENERAL_NOTIF_CONFIG_FETCH', apiCall());
  yield takeEvery('GET_GENERAL_NOTIF_CONFIG_FETCH_SUCCESS', apiRedirect(getGeneralNotifConfigSuccess, a => a.payload));
  yield takeEvery('GET_GENERAL_NOTIF_CONFIG_FETCH_FAILURE', apiRedirect(getGeneralNotifConfigFailure, 'error while getting notifications configs'));
  yield takeEvery('CHANGE_GENERAL_NOTIF_CONFIG', changeGeneralNotifConfig);
  yield takeEvery('CHANGE_GENERAL_NOTIF_CONFIG_FETCH', apiCall());
  yield takeEvery('CHANGE_GENERAL_NOTIF_CONFIG_FETCH_SUCCESS', apiRedirect(changeGeneralNotifConfigSuccess, a => a.payload));
  yield takeEvery('CHANGE_GENERAL_NOTIF_CONFIG_FETCH_FAILURE', apiRedirect(changeGeneralNotifConfigFailure, 'error while changing notifications configs'));
  yield takeEvery('GET_EVENT_DISTANCE_MAX', getEventMaxDistance);
  yield takeEvery('GET_EVENT_DISTANCE_MAX_FETCH', apiCall());
  yield takeEvery('GET_EVENT_DISTANCE_MAX_FETCH_SUCCESS', apiRedirect(getEventDistanceMaxSuccess, a => a.payload.eventSearchMaxPerimeter));
  yield takeEvery('GET_EVENT_DISTANCE_MAX_FETCH_FAILURE', apiRedirect(getEventDistanceMaxFailure, 'error while getting the distance max for events'));
  yield takeEvery('CHANGE_EVENT_DISTANCE_MAX', changeEventDistanceMax);
  yield takeEvery('CHANGE_EVENT_DISTANCE_MAX_FETCH', apiCall());
  yield takeEvery('CHANGE_EVENT_DISTANCE_MAX_FETCH_SUCCESS', apiRedirect(changeEventDistanceMaxSuccess, a => a.payload.eventSearchMaxPerimeter));
  yield takeEvery('CHANGE_EVENT_DISTANCE_MAX_FETCH_FAILURE', apiRedirect(changeEventDistanceMaxFailure, 'error while changing notifications configs'));
  yield takeEvery('TOGGLE_DISPO_STATUS', toggleDispoStatus);
  yield takeEvery('TOGGLE_DISPO_STATUS_FETCH', apiCall());
  yield takeEvery('TOGGLE_DISPO_STATUS_FETCH_SUCCESS', apiRedirect(toggleDispoStatusSuccess));
  yield takeEvery('TOGGLE_DISPO_STATUS_FETCH_FAILURE', apiRedirect(toggleDispoStatusFailure, 'error while changing disponibility status'));
};

export default watchUser;
