// @flow

// State
export type Notifs = {
  +edit_event: boolean,
  +friend_join: boolean,
  +remember: boolean,
};

export type NotifsState = {
  +data: Notifs[],
  +isLoading: boolean,
  error: null | Error,
};

// Actions
export type getNotifFetch = {
  +type: 'GET_NOTIF_FETCH',
  +payload: {
    id: number,
  },
};

export type getNotifFetchSuccess = {
  +type: 'GET_NOTIF_FETCH_SUCCESS',
  +payload: {
      data: Notifs[],
  },
};

export type getNotifFetchFailure = {
  +type: 'GET_NOTIF_FETCH_FAILURE',
  +payload: {
    error: Error,
  },
};

export type setNotifFetch = {
  +type: 'SET_NOTIF_FETCH',
  +payload: {
    id: number,
    edit_event: boolean,
    friend_join: boolean,
    remember: boolean,
  },
};

export type setNotifFetchSuccess = {
  +type: 'SET_NOTIF_FETCH_SUCCESS',
  +payload: {
    status: string
  },
};

export type setNotifFetchFailure = {
  +type: 'SET_NOTIF_FETCH_FAILURE',
  +payload: {
    error: Error,
  },
};

export type NotifsAction = (
  | getNotifFetch
  | getNotifFetchSuccess
  | getNotifFetchFailure
  | setNotifFetch
  | setNotifFetchSuccess
  | setNotifFetchFailure
);
