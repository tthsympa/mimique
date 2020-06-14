import { testSaga } from 'redux-saga-test-plan';
import FetchApi from '../services/FetchApi';
import { apiCall, tokenSelector } from './api';
import { fetch, fetchStart, fetchSuccess, fetchFailure } from '../actions/api';

describe('apiCall without extraOptions', () => {
  const actionType = 'TEST';
  const action = fetch({
    type: actionType,
    fetches: [{
      endPoint: 'test/test',
    }],
  });
  const payload = { test: 'test' };

  test('should return a function', () => {
    expect(typeof apiCall()).toBe('function');
  });

  test('should proceed to a success api call', () => {
    testSaga(apiCall(), action)
      .next()
      .select(tokenSelector)

      .next('TOKEN')
      .put(fetchStart(actionType))

      .next()
      .call(
        FetchApi,
        'test/test', undefined, undefined, undefined, undefined, 'TOKEN',
      )

      .next({ response: payload })
      .put(fetchSuccess(actionType, payload))

      .next()
      .isDone();
  });

  test('should proceed to a failure api call', () => {
    testSaga(apiCall(), action)
      .next()
      .select(tokenSelector)

      .next('TOKEN')
      .put(fetchStart(actionType))

      .next()
      .call(
        FetchApi,
        'test/test', undefined, undefined, undefined, undefined, 'TOKEN',
      )

      .next({ error: payload })
      .put(fetchFailure(actionType, payload))

      .next()
      .isDone();
  });

  // TODO: apiCall WITH extraOptions
});
