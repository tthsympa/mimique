// @flow

export type Pagination = {
  +page: number,
  +limit: number,
};

// State
export type Category = {
  +id: number,
  +name: string,
  +color: string,
};

export type Interest = {
  +id: number,
  +category: number,
  +name: string,
  +imageUrl: string,
};

export type ByCategories = {
  +[number]: number[], // categoryId: [eventIndex]
};

export type ByTime = {
  +['week' | 'upcoming' | 'past']: number[], // time: [eventIndex]
};

export type Event = {
  +id: number,
  +source: string,
  +title: string,
  +description: string,
  +imageUrl: string,
  +beginDatetime: Date,
  +endDatetime: Date,
  +address: string,
  +postalCode: string,
  +city: string,
  +country: string,
  +latitude: string,
  +longitude: string,
  +interests: Interest[],
  +participates: boolean,
  +mostPertinent: number,
  +locked: boolean,
};

export type EventWrapper = {
  +id: number,
  +event: Event,
  +suggestionDatetime: Date,
  +accepted: boolean,
  +acceptedEventParticipation: any,
  +mostPertinent: number,
};

export type EventsState = {
  +all: Event[],
  +isLoading: boolean,
  +error: null | Error,
  +categories: Category[],
  +suggestionsByCategories: ByCategories,
  +participationsByTime: ByTime,
};

export type EventSection = {
  +title: string,
  +data: Event[],
};

// Actions
export type EventsFetch = {
  +type: 'EVENTS_FETCH',
  +payload: {},
};

export type Participants = {
  +firstName: string,
  +lastname: string,
  +imageUrl: string,
};

export type EventsFetchSuccess = {
  +type: 'EVENTS_FETCH_SUCCESS',
  +payload: {
    +suggestions: EventWrapper[],
    +participations: EventWrapper[],
    +categories: Category[],
  },
};

export type EventsFetchFailure = {
  +type: 'EVENTS_FETCH_FAILURE',
  +payload: {
    +error: Error,
  },
};

export type EventsCreateParticipation = {
  +type: 'EVENTS_CREATE_PARTICIPATION_FETCH',
  +payload: {
    id: number,
  },
};

export type EventsCreateParticipationSuccess = {
  +type: 'EVENTS_CREATE_PARTICIPATION_FETCH_SUCCESS',
  +payload: {
    id: number,
    event: Event,
  },
};

export type EventsCreateParticipationFailure = {
  +type: 'EVENTS_CREATE_PARTICIPATION_FETCH_FAILURE',
  +payload: {
    error: Error,
  },
};

export type EventsDeleteParticipation = {
  +type: 'EVENTS_DELETE_PARTICIPATION_FETCH',
  +payload: {
    id: number,
  },
};

export type EventsDeleteParticipationSuccess = {
  +type: 'EVENTS_DELETE_PARTICIPATION_FETCH_SUCCESS',
  +payload: {
    id: number,
    event: Event,
  },
};

export type EventsDeleteParticipationFailure = {
  +type: 'EVENTS_DELETE_PARTICIPATION_FETCH_FAILURE',
  +payload: {
    error: Error,
  },
};

export type EventsHideInterest = {
  +type: 'EVENTS_HIDE_INTEREST_FETCH',
  +payload: {
    id: number,
  },
};

export type EventsHideInterestSuccess = {
  +type: 'EVENTS_HIDE_INTEREST_FETCH_SUCCESS',
  +payload: {
    status: string,
    data: null,
  },
};

export type EventsHideInterestFailure = {
  +type: 'EVENTS_HIDE_INTEREST_FETCH_FAILURE',
  +payload: {
    error: Error,
  },
};

export type EventsParticipants = {
  +type: 'EVENTS_PARTICIPANTS_FETCH',
  +payload: {
    id: number,
  },
};

export type EventsParticipantsSuccess = {
  +type: 'EVENTS_PARTICIPANTS_FETCH_SUCCESS',
  +payload: {
    +participants: Participants[],
  },
};

export type EventsParticipantsFailure = {
  +type: 'EVENTS_PARTICIPANTS_FETCH_FAILURE',
  +payload: {
    error: Error,
  },
};

export type EventsFetchById = {
  +type: 'EVENTS_FETCH_BY_ID',
  +payload: {
    id: number,
  },
};

export type EventsFetchByIdSuccess = {
  +type: 'EVENTS_FETCH_BY_ID_FETCH_SUCCESS',
  +payload: Event,
};

export type EventsFetchByIdFailure = {
  +type: 'EVENTS_FETCH_BY_ID_FETCH_FAILURE',
  +payload: {
    +error: Error,
  },
};

export type EventsAction = (
  | EventsFetch
  | EventsFetchSuccess
  | EventsFetchFailure
  | EventsCreateParticipation
  | EventsCreateParticipationSuccess
  | EventsCreateParticipationFailure
  | EventsDeleteParticipation
  | EventsDeleteParticipationSuccess
  | EventsDeleteParticipationFailure
  | EventsHideInterest
  | EventsHideInterestSuccess
  | EventsHideInterestFailure
  | EventsParticipants
  | EventsParticipantsSuccess
  | EventsParticipantsFailure
  | EventsFetchById
  | EventsFetchByIdSuccess
  | EventsFetchByIdFailure
);
