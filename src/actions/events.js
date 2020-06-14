// @flow

import type {
  EventsFetch,
  EventsCreateParticipation,
  EventsCreateParticipationSuccess,
  EventsDeleteParticipation,
  EventsHideInterest,
  EventsParticipants,
  FetchEventById,
} from 'reduxTypes/events';

export const eventsFetch = (): EventsFetch => ({
  type: 'EVENTS_FETCH',
  payload: {},
});

export const eventsCreateParticipation = (id: number): EventsCreateParticipation => ({
  type: 'EVENTS_CREATE_PARTICIPATION_FETCH',
  payload: {
    id,
  },
});

export const eventsCreateParticipationSuccess =
  (id: number, event: Event): EventsCreateParticipationSuccess => ({
    type: 'EVENTS_CREATE_PARTICIPATION_FETCH_SUCCESS',
    payload: {
      id,
      event,
    },
  });

export const eventsDeleteParticipation = (id: number): EventsDeleteParticipation => ({
  type: 'EVENTS_DELETE_PARTICIPATION_FETCH',
  payload: {
    id,
  },
});

export const eventsHideInterest = (id: number): EventsHideInterest => ({
  type: 'EVENTS_HIDE_INTEREST_FETCH',
  payload: {
    id,
  },
});

export const eventsParticipants = (id: number): EventsParticipants => ({
  type: 'EVENTS_PARTICIPANTS_FETCH',
  payload: {
    id,
  },
});

export const fetchEventById = (id: number): FetchEventById => ({
  type: 'EVENTS_FETCH_BY_ID',
  payload: {
    id,
  },
});

