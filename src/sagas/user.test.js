import { call, put } from 'redux-saga/effects';
import { logIn as logInSaga } from './user';
import { logIn as logInAction, logInError as logInErrorAction } from '../actions/user';
import callSocialConnect from '../services/SocialConnect';
import { fetch } from '../actions/api';

describe('Token management without errors', () => {
  const source = 'facebook';
  const action = logInAction(source);
  const gen = logInSaga(action);

  test('should get valid oAuth token', () => {
    expect(gen.next().value)
      .toEqual(call(callSocialConnect, source));
  });

  test('should send a valid oAuth token and fetch mimique token', () => {
    const accessToken = 'TOKEN';
    const fetchAction = fetch({
      type: action.type,
      fetches: [{
        endPoint: `auth/login/${action.source}`,
        method: 'POST',
        payload: { accessToken },
        errorAlert: false,
      }],
    });
    expect(gen.next(accessToken).value)
      .toEqual(put(fetchAction));
  });
});

describe('Token management with cancel or error', () => {
  const source = 'facebook';
  const action = logInAction(source);
  const gen = logInSaga(action);

  test('should null because of user cancelation', () => {
    expect(gen.next().value)
      .toEqual(call(callSocialConnect, source));
  });

  test('should send a valid oAuth token and fetch mimique token', () => {
    const fakeToken = null; // callSocialConnect return null if user cancel the process.
    expect(gen.next(fakeToken).value)
      .toEqual(put(logInErrorAction('cancel')));
  });
});
