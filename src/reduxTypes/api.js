// @flow

// Serice
export type MethodName = 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';

export type FetchError = {
  error: {
    message: string,
    code: number,
  },
  status: string,
};

export type FetchResponse = {
  response: Object,
  error: FetchError,
};


// Actions
export type FetchOption = {
  endPoint: string,
  method?: MethodName,
  payload?: Object,
  errorAlert?: boolean,
  extraHeaders?: Object
};

export type Fetch = {
  type: string,
  fetches: FetchOption[],
};

export type Response = {
  type: string,
  payload: Object,
};

export type FetchStart = {
  type: string,
};

export type FetchSuccess = {
  type: string,
  payload: Object,
};

export type FetchFailure = {
  type: string,
  payload: Object,
};

export type ApiCallAction = (
  | Fetch
  | Response
  | FetchStart
  | FetchSuccess
  | FetchFailure
);
