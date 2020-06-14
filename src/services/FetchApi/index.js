// @flow

import { Alert } from 'react-native';
import services from 'config/services';
import Sentry from 'sentry-expo';
import type { MethodName, FetchResponse } from 'reduxTypes/api';

function throwErrorAlert(error: any) {
  // eslint-disable-next-line no-mixed-operators
  const message = error.detail && error.detail.nonFieldErrors[0] || error.message;
  Alert.alert(
    'Oupsi !',
    message,
  );
}

function fetchErrorReporting(errorAlert: boolean, error: any, fetchingContext: Object) {
  if (__DEV__) {
    console.error(error);
  }
  if (errorAlert) {
    throwErrorAlert(error);
  }
  Sentry.captureMessage(
    `Fetch API Error: ${fetchingContext.method} ${fetchingContext.url}`,
    { extra: { fetchingContext, error } },
  );
}

/**
   * Make a call to the API.
   * @param {string} endPoint It will be concateaed to the host and the namespace.
   * @param {MethodName} [method='GET']
   * @param {Object} [payload={}]
   * @param {boolean} [errorAlert=true] Display an Alert in an error occured.
   * Disable this if you already manage this case.
   * @param {Object} [extraHeaders={}] Additional headers.
   * @param {string} [authToken=''] Authentication token
   * @returns {FetchResponse}
   * @memberof Service
   */
function fetchApi(
  endPoint: string,
  method: MethodName = 'GET',
  payload: Object = {},
  errorAlert: boolean = true,
  extraHeaders: Object = {},
  authToken: string = '',
): Promise<FetchResponse> {
  const url = `${services.baseApiUrl}/${endPoint}`;
  let defaultHeaders = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept': 'application/json',
    'Accept-Language': 'fr-FR',
    'Content-Type': 'application/json',
  };
  if (authToken) {
    defaultHeaders = { ...defaultHeaders, 'Authorization': `JWT ${authToken}` };
  }
  const headers = { ...defaultHeaders, ...extraHeaders };
  if (__DEV__) {
    console.info(`API Call: ${method} ${url} payload, headers:`, payload, headers);
  }
  const body = ['GET', 'HEAD'].includes(method)
    ? null
    : JSON.stringify(payload);
  const fetchingContext = {
    url,
    method,
    headers,
    payload,
  };
  return (
    fetch(url, {
      method,
      headers,
      body,
    })
      .then((response) => {
        if (__DEV__) {
          console.info(`API Call Response: ${method} ${url} response:`, response);
        }
        if (response.ok) {
          return response.json()
            .then(json => ({ response: json.data || json }))
            .catch(() => ({ response: null }));
        }
        return response.json()
          .then((json) => {
            const { error } = json.data;
            fetchErrorReporting(errorAlert, error, fetchingContext);
            return { error };
          })
          .catch(() => {
            const error = new Error(`Server error: ${response.status}`);
            fetchErrorReporting(errorAlert, error, fetchingContext);
            return { error };
          });
      })
      .catch((error) => {
        fetchErrorReporting(errorAlert, error, fetchingContext);
        return { error };
      })
  );
}

export default fetchApi;
