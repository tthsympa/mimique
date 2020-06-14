// @flow

// State
export type SocialConnectSource = 'facebook' | 'google';

export type LocationCoordinates = {
  latitude: number,
  longitude: number,
};

export type Providers = {
  +id: number,
  +socialUserId: string,
  +type: SocialConnectSource,
};

export type Notifications = {
  +push: boolean,
  +mail: boolean,
};

export type User = {
  +id: number,
  +authToken: string,
  +email: string,
  +firstName: string,
  +lastName: string,
  +avatarUrl?: string,
  +location?: LocationCoordinates,
  +providers?: Providers[],
  +notifs?: Notifications,
  +isFirstLogin?: boolean,
  +distanceMaxEvent?: number,
};

export type UserState = {
  +isLoggedIn: boolean,
  +isLoading: boolean,
  +providersFetchIsRunning: boolean,
  +logInProcessIsRunning: boolean,
  +logInError: boolean,
  +logInErrorType?: string,
  +error?: any,
  +user: User,
};


// Actions
export type LogIn = {
  +type: 'LOG_IN',
  +source: SocialConnectSource,
};

export type LogInFetch = {
  +type: 'LOG_IN_FETCH',
  +source: SocialConnectSource,
};

export type LogInError = {
  +type: 'LOG_IN_ERROR',
  errorType: 'error' | 'cancel';
};

export type LoggedIn = {
  +type: 'LOGGED_IN',
  +user: User,
};

export type LogOut = {
  +type: 'LOG_OUT',
};

export type LoggedOut = {
  +type: 'LOGGED_OUT',
};

export type ResetUtils = {
  +type: 'USER_RESET_UTILS'
};

export type ProvidersFetch = {
  +type: 'PROVIDERS_FETCH',
};

export type ProvidersFetchSuccess = {
  +type: 'PROVIDERS_FETCH_SUCCESS',
  +payload: any,
};

export type ProvidersFetchFailure = {
  +type: 'PROVIDERS_FETCH_FAILURE',
  +error: Error
};

export type AddProvider = {
  +type: 'ADD_PROVIDER',
  +source: SocialConnectSource,
  +authToken: string,
};

export type AddProviderSuccess = {
  +type: 'ADD_PROVIDER_SUCCESS',
  +source: SocialConnectSource,
};

export type AddProviderFailure = {
  +type: 'ADD_PROVIDER_FAILURE',
  +errorType: 'error' | 'cancel',
};

export type DeleteProvider = {
  +type: 'DELETE_PROVIDER',
  +id: number,
};

export type DeleteProviderFailure = {
  +type: 'DELETE_PROVIDER_FAILURE',
  +error: Error,
};

export type EraseUser = {
  +type: 'ERASE_USER'
};

export type SendUserLocation = {
  +type: 'SEND_USER_LOCATION_FETCH',
  +location: LocationCoordinates,
};

export type SendUserLocationSuccess = {
  +type: 'SEND_USER_LOCATION_FETCH_SUCCESS',
  +location: LocationCoordinates,
};

export type SendUserLocationFailure = {
  +type: 'SEND_USER_LOCATION_FETCH_FAILURE',
  +error: any,
};

export type ChangeMail = {
  +type: 'CHANGE_MAIL',
  +mail: string,
};

export type ChangeMailSuccess = {
  +type: 'CHANGE_MAIL_SUCCESS',
  +newMail: string,
};

export type ChangeMailFailure = {
  +type: 'CHANGE_MAIL_FAILURE',
};

export type InitExpoNotif = {
  +type: 'INIT_EXPO_NOTIF',
  +token: string,
};

export type InitExpoNotifSuccess = {
  +type: 'INIT_EXPO_NOTIF_SUCCESS',
};

export type InitExpoNotifFailure = {
  +type: 'INIT_EXPO_NOTIF_FAILURE',
  +error: Error,
};

export type UpdateIsFirstLogin = {
  +type: 'UPDATE_TOOGLE_IS_FIRST_LOGIN',
  +isFirstLogin: boolean,
};

export type GetGeneralNotifConfig = {
  +type: 'GET_GENERAL_NOTIF_CONFIG',
};
export type GetGeneralNotifConfigSuccess = {
  +type: 'GET_GENERAL_NOTIF_CONFIG_SUCCESS',
  +payload: Notifications,
};
export type GetGeneralNotifConfigFailure = {
  +type: 'GET_GENERAL_NOTIF_CONFIG_FAILURE',
  +error: Error,
};

export type ChangeGeneralNotifConfig = {
  +type: 'CHANGE_GENERAL_NOTIF_CONFIG',
  +typeNotif: string,
};
export type ChangeGeneralNotifConfigSuccess = {
  +type: 'CHANGE_GENERAL_NOTIF_CONFIG_SUCCESS',
  +payload: Notifications,
};
export type ChangeGeneralNotifConfigFailure = {
  +type: 'CHANGE_GENERAL_NOTIF_CONFIG_FAILURE',
  +error: Error,
};

export type GetEventDistanceMax = {
  +type: 'GET_EVENT_DISTANCE_MAX',
};
export type GetEventDistanceMaxSuccess = {
  +type: 'GET_EVENT_DISTANCE_MAX_SUCCESS',
  +payload: number,
};
export type GetEventDistanceMaxFailure = {
  type: 'GET_EVENT_DISTANCE_MAX_FAILURE',
  +error: Error,
};

export type ChangeEventDistanceMax = {
  +type: 'CHANGE_EVENT_DISTANCE_MAX',
  +distance: number,
};
export type ChangeEventDistanceMaxSuccess = {
  +type: 'CHANGE_EVENT_DISTANCE_MAX_SUCCESS',
  +payload: number,
  };
export type ChangeEventDistanceMaxFailure = {
  +type: 'CHANGE_EVENT_DISTANCE_MAX_FAILURE',
  +error: Error,
};

export type ToggleDispoStatus = {
  +type: 'TOGGLE_DISPO_STATUS',
  +payload: Object,
};
export type ToggleDispoStatusSuccess = {
  +type: 'TOGGLE_DISPO_STATUS_SUCCESS',
};
export type ToggleDispoStatusFailure = {
  +type: 'TOGGLE_DISPO_STATUS_FAILURE',
  +error: Error,
};

export type UserAction = (
  | LogIn
  | LogInError
  | LoggedIn
  | LogOut
  | LoggedOut
  | ResetUtils
  | ProvidersFetch
  | ProvidersFetchSuccess
  | ProvidersFetchFailure
  | AddProvider
  | AddProviderSuccess
  | AddProviderFailure
  | DeleteProvider
  | DeleteProviderFailure
  | EraseUser
  | SendUserLocation
  | SendUserLocationSuccess
  | SendUserLocationFailure
  | ChangeMail
  | ChangeMailSuccess
  | ChangeMailFailure
  | InitExpoNotif
  | InitExpoNotifSuccess
  | InitExpoNotifFailure
  | UpdateIsFirstLogin
  | GetGeneralNotifConfig
  | GetGeneralNotifConfigSuccess
  | GetGeneralNotifConfigFailure
  | ChangeGeneralNotifConfig
  | ChangeGeneralNotifConfigSuccess
  | ChangeGeneralNotifConfigFailure
  | GetEventDistanceMax
  | GetEventDistanceMaxSuccess
  | GetEventDistanceMaxFailure
  | ChangeEventDistanceMax
  | ChangeEventDistanceMaxSuccess
  | ChangeEventDistanceMaxFailure
  | ToggleDispoStatus
  | ToggleDispoStatusSuccess
  | ToggleDispoStatusFailure
);
