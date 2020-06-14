// @flow

import type {
  Interest,
  InterestsFetch,
  InterestsFetchSuccess,
  InterestsFetchFailure,
  AddInterest,
  RemoveInterest,
} from 'reduxTypes/interests';

// FETCH
export const interestsFetch = (): InterestsFetch => ({
  type: 'INTERESTS_FETCH',
  payload: {},
});

export const interestsFetchSuccess = (
  interests: Interest[],
  userInterests: Interest[],
): InterestsFetchSuccess => ({
  type: 'INTERESTS_FETCH_SUCCESS',
  payload: {
    interests,
    userInterests,
  },
});

export const interestsFetchFailure = (error: Error): InterestsFetchFailure => ({
  type: 'INTERESTS_FETCH_FAILURE',
  payload: {
    error,
  },
});

// ADD / DELETE
export const addInterest = (
  interest: Interest,
  userId: number,
): AddInterest => ({
  type: 'ADD_INTEREST',
  payload: {
    interest,
    userId,
  },
});

export const removeInterest = (
  interestId: number,
  userId: number,
): RemoveInterest => ({
  type: 'REMOVE_INTEREST',
  payload: {
    interestId,
    userId,
  },
});

