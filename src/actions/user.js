// @flow

import type
{
  LocationCoordinates,
  SocialConnectSource,
  User,
  LogIn,
  LogInError,
  LoggedIn,
  LoggedOut,
  LogOut,
  ResetUtils,
  ProvidersFetch,
  ProvidersFetchSuccess,
  ProvidersFetchFailure,
  Providers,
  AddProvider,
  AddProviderSuccess,
  AddProviderFailure,
  DeleteProvider,
  DeleteProviderFailure,
  EraseUser,
  SendUserLocation,
  SendUserLocationSuccess,
  SendUserLocationFailure,
  ChangeMail,
  ChangeMailSuccess,
  ChangeMailFailure,
  InitExpoNotif,
  InitExpoNotifSuccess,
  InitExpoNotifFailure,
  UpdateIsFirstLogin,
  Notifications,
  GetGeneralNotifConfig,
  GetGeneralNotifConfigSuccess,
  GetGeneralNotifConfigFailure,
  ChangeGeneralNotifConfig,
  ChangeGeneralNotifConfigSuccess,
  ChangeGeneralNotifConfigFailure,
  GetEventDistanceMax,
  GetEventDistanceMaxSuccess,
  GetEventDistanceMaxFailure,
  ChangeEventDistanceMax,
  ChangeEventDistanceMaxSuccess,
  ChangeEventDistanceMaxFailure,
  ToggleDispoStatus,
  ToggleDispoStatusSuccess,
  ToggleDispoStatusFailure,
} from 'reduxTypes/user';

export const logIn = (source: SocialConnectSource): LogIn => ({
  type: 'LOG_IN',
  source,
});

export const logInError = (errorType: 'error' | 'cancel'): LogInError => ({
  type: 'LOG_IN_ERROR',
  errorType,
});

export const loggedIn = (user: User): LoggedIn => ({
  type: 'LOGGED_IN',
  user,
});

export const logOut = (): LogOut => ({
  type: 'LOG_OUT',
});

export const loggedOut = (): LoggedOut => ({
  type: 'LOGGED_OUT',
});

export const resetUtils = (): ResetUtils => ({
  type: 'USER_RESET_UTILS',
});

export const providersFetch = (): ProvidersFetch => ({
  type: 'PROVIDERS_FETCH',
});

export const providersFetchSuccess = (payload: Providers[]): ProvidersFetchSuccess => ({
  type: 'PROVIDERS_FETCH_SUCCESS',
  payload,
});

export const providersFetchFailure = (error: Error): ProvidersFetchFailure => ({
  type: 'PROVIDERS_FETCH_FAILURE',
  error,
});

export const addProvider = (source: SocialConnectSource, authToken: string): AddProvider => ({
  type: 'ADD_PROVIDER',
  source,
  authToken,
});

export const addProviderSuccess = (source: SocialConnectSource): AddProviderSuccess => ({
  type: 'ADD_PROVIDER_SUCCESS',
  source,
});

export const addProviderFailure = (errorType: 'error' | 'cancel'): AddProviderFailure => ({
  type: 'ADD_PROVIDER_FAILURE',
  errorType,
});

export const deleteProvider = (id: number): DeleteProvider => ({
  type: 'DELETE_PROVIDER',
  id,
});

export const deleteProviderFailure = (error: Error): DeleteProviderFailure => ({
  type: 'DELETE_PROVIDER_FAILURE',
  error,
});

export const eraseUser = (): EraseUser => ({
  type: 'ERASE_USER',
});

export const sendUserLocation = (location: LocationCoordinates): SendUserLocation => ({
  type: 'SEND_USER_LOCATION_FETCH',
  location,
});

export const sendUserLocationSuccess
  = (location: LocationCoordinates): SendUserLocationSuccess => ({
    type: 'SEND_USER_LOCATION_FETCH_SUCCESS',
    location,
  });

export const sendUserLocationFailure = (error: any): SendUserLocationFailure => ({
  type: 'SEND_USER_LOCATION_FETCH_FAILURE',
  error,
});

export const changeMail = (mail: string): ChangeMail => ({
  type: 'CHANGE_MAIL',
  mail,
});

export const changeMailSuccess = (newMail: string): ChangeMailSuccess => ({
  type: 'CHANGE_MAIL_SUCCESS',
  newMail,
});

export const changeMailFailure = (): ChangeMailFailure => ({
  type: 'CHANGE_MAIL_FAILURE',
});

export const initExpoNotif = (token: string): InitExpoNotif => ({
  type: 'INIT_EXPO_NOTIF',
  token,
});

export const initExpoNotifSuccess = (token: string): InitExpoNotifSuccess => ({
  type: 'INIT_EXPO_NOTIF_SUCCESS',
  token,
});

export const initExpoNotifFailure = (error: Error): InitExpoNotifFailure => ({
  type: 'INIT_EXPO_NOTIF_FAILURE',
  error,
});

export const updateIsFirstLogin = (isFirstLogin: boolean): UpdateIsFirstLogin => ({
  type: 'UPDATE_TOOGLE_IS_FIRST_LOGIN',
  isFirstLogin,
});

export const getGeneralNotifConfig = (): GetGeneralNotifConfig => ({
  type: 'GET_GENERAL_NOTIF_CONFIG',
});
export const getGeneralNotifConfigSuccess =
  (payload: Notifications): GetGeneralNotifConfigSuccess => ({
    type: 'GET_GENERAL_NOTIF_CONFIG_SUCCESS',
    payload,
  });
export const getGeneralNotifConfigFailure = (error: Error): GetGeneralNotifConfigFailure => ({
  type: 'GET_GENERAL_NOTIF_CONFIG_FAILURE',
  error,
});

export const changeGeneralNotifConfig = (typeNotif: string): ChangeGeneralNotifConfig => ({
  type: 'CHANGE_GENERAL_NOTIF_CONFIG',
  typeNotif,
});
export const changeGeneralNotifConfigSuccess =
  (payload: Notifications): ChangeGeneralNotifConfigSuccess => ({
    type: 'CHANGE_GENERAL_NOTIF_CONFIG_SUCCESS',
    payload,
  });
export const changeGeneralNotifConfigFailure = (error: Error): ChangeGeneralNotifConfigFailure => ({
  type: 'CHANGE_GENERAL_NOTIF_CONFIG_FAILURE',
  error,
});

export const getEventDistanceMax = (): GetEventDistanceMax => ({
  type: 'GET_EVENT_DISTANCE_MAX',
});
export const getEventDistanceMaxSuccess =
  (payload: number): GetEventDistanceMaxSuccess => ({
    type: 'GET_EVENT_DISTANCE_MAX_SUCCESS',
    payload,
  });
export const getEventDistanceMaxFailure = (error: Error): GetEventDistanceMaxFailure => ({
  type: 'GET_EVENT_DISTANCE_MAX_FAILURE',
  error,
});

export const changeEventDistanceMax = (distance: number): ChangeEventDistanceMax => ({
  type: 'CHANGE_EVENT_DISTANCE_MAX',
  distance,
});
export const changeEventDistanceMaxSuccess =
  (payload: number): ChangeEventDistanceMaxSuccess => ({
    type: 'CHANGE_EVENT_DISTANCE_MAX_SUCCESS',
    payload,
  });
export const changeEventDistanceMaxFailure = (error: Error): ChangeEventDistanceMaxFailure => ({
  type: 'CHANGE_EVENT_DISTANCE_MAX_FAILURE',
  error,
});

export const toggleDispoStatus = (payload: Object): ToggleDispoStatus => ({
  type: 'TOGGLE_DISPO_STATUS',
  payload,
});
export const toggleDispoStatusSuccess = (): ToggleDispoStatusSuccess => ({
  type: 'TOGGLE_DISPO_STATUS_SUCCESS',
});
export const toggleDispoStatusError = (error: Error): ToggleDispoStatusFailure => ({
  type: 'TOGGLE_DISPO_STATUS_FAILURE',
  error,
});
