// @flow

// State
export type Interest = {
  +id: number,
  +category: number,
  +name: string,
  +imageUrl: string,
};

export type InterestsState = {
  +all: Interest[],
  +isLoading: boolean,
  error: null | Error,
  interests: Interest[],
  userInterests: Interest[],
};

export type InterestsSection = {
  name: string,
  id: number,
  data: Interest[],
};

// Actions
export type InterestsFetch = {
  +type: 'INTERESTS_FETCH',
  +payload: {},
};

export type InterestsFetchSuccess = {
  +type: 'INTERESTS_FETCH_SUCCESS',
  +payload: {
    interests: Interest[],
    userInterests: Interest[],
  },
};

export type InterestsFetchFailure = {
  +type: 'INTERESTS_FETCH_FAILURE',
  +payload: {
    error: Error,
  },
};

export type AddInterest = {
  +type: 'ADD_INTEREST',
  +payload: {
    interest: Interest,
    userId: number,
  },
};

export type RemoveInterest = {
  +type: 'REMOVE_INTEREST',
  +payload: {
    interestId: number,
    userId: number,
  },
};

export type InterestsAction = (
  | InterestsFetch
  | InterestsFetchSuccess
  | InterestsFetchFailure
  | AddInterest
  | RemoveInterest
);
