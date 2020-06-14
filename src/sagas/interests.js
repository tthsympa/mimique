// @flow

import { takeEvery, select } from 'redux-saga/effects';
import type { InterestsFetch, AddInterest, RemoveInterest } from 'reduxTypes/interests';
import { apiCall } from './api';
import { fetch } from '../actions/api';

const fetchInterests = function* fetchUser(action: InterestsFetch): Generator<*, *, *> {
  const userId = yield select(state => state.user.user.id);
  const fetchAction = fetch({
    type: action.type,
    fetches: [{
      endPoint: 'categories-interests',
      method: 'GET',
    },
    {
      endPoint: `user/${userId}/interests`,
      method: 'GET',
    }],
  });
  yield apiCall({
    responseTransformers: [
      ({ categories }) => ({ interests: categories }),
      userInterests => ({ userInterests }),
    ],
  })(fetchAction);
};

const addInterests = function* fetchUser(action: AddInterest): Generator<*, *, *> {
  const { interest, userId } = action.payload;
  const fetchAction = fetch({
    type: action.type,
    fetches: [{
      endPoint: `user/${userId}/interest/${interest.id}`,
      method: 'POST',
    }],
  });
  yield apiCall({
    responseTransformers: [
    ],
  })(fetchAction);
};

const removeInterests = function* fetchUser(action: RemoveInterest): Generator<*, *, *> {
  const { interestId, userId } = action.payload;
  const fetchAction = fetch({
    type: action.type,
    fetches: [{
      endPoint: `user/${userId}/interest/${interestId}`,
      method: 'DELETE',
    }],
  });
  yield apiCall({
    responseTransformers: [
    ],
  })(fetchAction);
};

const watchInterests = function* watchInterests(): Generator<*, *, *> {
  yield takeEvery('INTERESTS_FETCH', fetchInterests);
  yield takeEvery('ADD_INTEREST', addInterests);
  yield takeEvery('REMOVE_INTEREST', removeInterests);
};

export default watchInterests;
