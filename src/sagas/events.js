// @flow

import { takeEvery } from 'redux-saga/effects';
import type { EventsFetch, EventsCreateParticipation, EventsDeleteParticipation, EventsHideInterest, EventsParticipants, FetchEventById } from 'reduxTypes/events';
import { apiCall } from './api';
import { fetch } from '../actions/api';

const fetchEvents = function* fetchUser(action: EventsFetch): Generator<*, *, *> {
  const fetchAction = fetch({
    type: action.type,
    fetches: [
      {
        endPoint: 'my-events-suggestions',
        method: 'GET',
      },
      {
        endPoint: 'event-participations',
        method: 'GET',
      },
      {
        endPoint: 'categories',
        method: 'GET',
      },
    ],
  });
  yield apiCall({
    responseTransformers: [
      suggestions => ({ suggestions }),
      participations => ({ participations }),
      categories => ({ categories }),
    ],
  })(fetchAction);
};

const createParticipation =
  function* fetchUser(action: EventsCreateParticipation): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [
        {
          endPoint: 'event-participation',
          method: 'POST',
          payload: {
            event: action.payload.id,
          },
        },
      ],
    });
    yield apiCall()(fetchAction);
  };

const deleteParticipation =
  function* fetchUser(action: EventsDeleteParticipation): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [
        {
          endPoint: `event-participation?event_id=${action.payload.id}`,
          method: 'DELETE',
        },
      ],
    });
    yield apiCall()(fetchAction);
  };

const eventsHideInterest =
  function* fetchUser(action: EventsHideInterest): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [
        {
          endPoint: 'interests/hide',
          method: 'POST',
          payload: {
            interests: action.payload.id,
          },
        },
      ],
    });
    yield apiCall()(fetchAction);
  };

const eventsParticipants =
  function* fetchUser(action: EventsParticipants): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [
        {
          endPoint: `event/${action.payload.id}/participants`,
          method: 'GET',
        },
      ],
    });
    yield apiCall({
      responseTransformers: [
        participants => [participants],
      ],
    })(fetchAction);
  };

const fetchEventById =
  function* fetchUser(action: FetchEventById): Generator<*, *, *> {
    const fetchAction = fetch({
      type: action.type,
      fetches: [
        {
          endPoint: `event/${action.payload.id}`,
          method: 'GET',
        },
      ],
    });
    yield apiCall()(fetchAction);
  };

const watchEvents = function* watchEvents(): Generator<*, *, *> {
  yield takeEvery('EVENTS_FETCH', fetchEvents);
  yield takeEvery('EVENTS_CREATE_PARTICIPATION_FETCH', createParticipation);
  yield takeEvery('EVENTS_DELETE_PARTICIPATION_FETCH', deleteParticipation);
  yield takeEvery('EVENTS_HIDE_INTEREST_FETCH', eventsHideInterest);
  yield takeEvery('EVENTS_PARTICIPANTS_FETCH', eventsParticipants);
  yield takeEvery('EVENTS_FETCH_BY_ID', fetchEventById);
};

export default watchEvents;
