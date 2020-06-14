// @flow

import type { InterestsState, InterestsAction } from 'reduxTypes/interests';

const initialState: InterestsState = {
  all: [],
  isLoading: true,
  error: null,
  interests: [],
  userInterests: [],
};

export default (state: InterestsState = initialState, action: InterestsAction): InterestsState => {
  switch (action.type) {
    case 'INTERESTS_FETCH':
      return {
        ...state,
        isLoading: true,
      };
    case 'INTERESTS_FETCH_SUCCESS':
      return {
        ...state,
        all: action.payload.interests,
        isLoading: false,
        // $FlowFixMe
        interests: action.payload.interests.map(interest => interest.interests),
        userInterests: action.payload.userInterests,
      };
    case 'INTERESTS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case 'ADD_INTEREST':
      return {
        ...state,
        userInterests: [...state.userInterests, action.payload.interest],
      };
    case 'REMOVE_INTEREST':
      return {
        ...state,
        userInterests: state.userInterests.filter(userInterest => (
          // $FlowFixMe
          userInterest.id !== action.payload.interestId
        )),
      };
    default:
      return state;
  }
};
