// @flow
import Sentry from 'sentry-expo';
import type { UserState, UserAction } from '../reduxTypes/user';

const initialState: UserState = {
  isLoggedIn: false,
  providersFetchIsRunning: false,
  logInProcessIsRunning: false,
  logInError: false,
  logInErrorType: undefined,
  error: null,
  isLoading: false,
  user: {
    id: -1,
    authToken: '',
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: '',
    location: undefined,
    providers: [],
    notifs: undefined,
    isFirstLogin: false,
    distanceMaxEvent: undefined,
  },
};

export default (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        logInProcessIsRunning: true,
      };
    case 'LOG_IN_ERROR':
      return {
        ...state,
        isLoggedIn: false,
        logInProcessIsRunning: false,
        logInError: true,
        logInErrorType: action.errorType,
      };
    case 'LOGGED_IN':
      Sentry.setUserContext(action.user);
      return {
        ...state,
        isLoggedIn: true,
        logInProcessIsRunning: false,
        logInError: false,
        logInErrorType: undefined,
        user: action.user,
      };
    case 'LOGGED_OUT':
      Sentry.setUserContext();
      return initialState;
    case 'USER_RESET_UTILS':
      return {
        ...state,
        logInProcessIsRunning: false,
        logInError: false,
        logInErrorType: undefined,
      };
    case 'PROVIDERS_FETCH':
      return {
        ...state,
        providersFetchIsRunning: true,
      };
    case 'PROVIDERS_FETCH_SUCCESS':
      return {
        ...state,
        providersFetchIsRunning: false,
        user: {
          ...state.user,
          providers: action.payload[0],
        },
      };
    case 'PROVIDERS_FETCH_FAILURE':
      return {
        ...state,
        providersFetchIsRunning: false,
        error: action.error,
      };
    case 'ADD_PROVIDER':
      return state;
    case 'ADD_PROVIDER_SUCCESS':
      return state;
    case 'ADD_PROVIDER_ERROR':
      return {
        ...state,
        error: action.errorType,
      };
    case 'DELETE_PROVIDER':
      return state;
    case 'ERASE_USER':
      return state;
    case 'SEND_USER_LOCATION_FETCH':
      return {
        ...state,
        user: {
          ...state.user,
          location: action.location,
        },
        isLoading: true,
      };
    case 'SEND_USER_LOCATION_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case 'SEND_USER_LOCATION_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'CHANGE_MAIL':
      return {
        ...state,
        isLoading: true,
      };
    case 'CHANGE_MAIL_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          email: action.newMail,
        },
        isLoading: false,
        error: null,
      };
    case 'CHANGE_MAIL_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'INIT_EXPO_NOTIF':
      return {
        ...state,
        isLoading: true,
      };
    case 'INIT_EXPO_NOTIF_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };
    case 'INIT_EXPO_NOTIF_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'UPDATE_TOOGLE_IS_FIRST_LOGIN':
      return {
        ...state,
        user: {
          ...state.user,
          isFirstLogin: action.isFirstLogin,
        },
      };
    case 'GET_GENERAL_NOTIF_CONFIG':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_GENERAL_NOTIF_CONFIG_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          notifs: action.payload,
        },
      };
    case 'GET_GENERAL_NOTIF_CONFIG_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case 'CHANGE_GENERAL_NOTIF_CONFIG':
      return {
        ...state,
        isLoading: true,
      };
    case 'CHANGE_GENERAL_NOTIF_CONFIG_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          notifs: action.payload,
        },
      };
    case 'CHANGE_GENERAL_NOTIF_CONFIG_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'GET_EVENT_DISTANCE_MAX':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_EVENT_DISTANCE_MAX_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          distanceMaxEvent: action.payload,
        },
      };
    case 'GET_EVENT_DISTANCE_MAX_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case 'CHANGE_EVENT_DISTANCE_MAX':
      return {
        ...state,
        isLoading: true,
      };
    case 'CHANGE_EVENT_DISTANCE_MAX_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          distanceMaxEvent: action.payload,
        },
      };
    case 'CHANGE_EVENT_DISTANCE_MAX_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case 'TOGGLE_DISPO_STATUS':
      return {
        ...state,
        isLoading: true,
      };
    case 'TOGGLE_DISPO_STATUS_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };
    case 'TOGGLE_DISPO_STATUS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
