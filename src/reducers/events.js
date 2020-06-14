// @flow

import type {
  Event,
  EventsState,
  EventsAction,
  ByCategories,
  ByTime,
  EventWrapper,
  EventsCreateParticipationSuccess,
  EventsDeleteParticipationSuccess,
} from 'reduxTypes/events';
import unionBy from 'lodash/unionBy';
import moment from 'moment';

const initialState: EventsState = {
  all: [],
  isLoading: true,
  error: null,
  categories: [],
  suggestionsByCategories: {},
  participationsByTime: {},
};

const eventUnion = (suggestions: EventWrapper[], participations: EventWrapper[]) => {
  const suggestionsEvents = suggestions.map(s => ({ ...s.event, mostPertinent: s.mostPertinent }));
  const participationsEvents = participations.map(p => p.event);
  return unionBy(suggestionsEvents, participationsEvents, 'id');
};

const suggestionsByCategories = (events: Event[]): ByCategories => (
  events.reduce((acc, event, eventIdx) => (
    event.interests.reduce((interestsAcc, inter) => {
      const { category } = inter;
      if (event.participates) {
        return interestsAcc;
      }
      return {
        ...interestsAcc,
        [category]: [...(interestsAcc[category] || []), eventIdx],
      };
    }, acc)
  ), {})
);

const participationsByTime = (events: Event[]): ByTime => {
  const today = moment();
  const startWeek = moment().startOf('isoWeek');
  const endWeek = moment().endOf('isoWeek');

  return events.reduce((acc, event, eventIdx) => {
    if (!event.participates) {
      return acc;
    }
    const time = moment(event.beginDatetime);
    if (time.isBefore(today)) {
      return { ...acc, 'past': [...acc.past || [], eventIdx] };
    }
    if (time.isBetween(startWeek, endWeek, null, '[]')) {
      return { ...acc, 'week': [...acc.week || [], eventIdx] };
    }
    return { ...acc, 'upcoming': [...acc.upcoming || [], eventIdx] };
  }, { });
};

const alterEventParticipation = (
  state: EventsState,
  action: EventsCreateParticipationSuccess | EventsDeleteParticipationSuccess,
): EventsState => {
  const { id: alteredEventId } = action.payload;
  const all = state.all.map(e => ((e.id === alteredEventId) ? action.payload : e));
  return {
    ...state,
    all,
    suggestionsByCategories: suggestionsByCategories(all),
    participationsByTime: participationsByTime(all),
  };
};

export default (state: EventsState = initialState, action: EventsAction): EventsState => {
  switch (action.type) {
    case 'EVENTS_FETCH':
      return {
        ...state,
        isLoading: true,
      };
    case 'EVENTS_FETCH_SUCCESS': {
      const { suggestions, participations } = action.payload;
      const lockedEvents = state.all.filter(e => e.locked);
      const all = [...eventUnion(suggestions, participations), ...lockedEvents];
      return {
        ...state,
        all,
        isLoading: false,
        error: null,
        categories: action.payload.categories,
        suggestionsByCategories: suggestionsByCategories(all),
        participationsByTime: participationsByTime(all),
      };
    }
    case 'EVENTS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case 'EVENTS_CREATE_PARTICIPATION_FETCH_SUCCESS':
      return alterEventParticipation(state, action);
    case 'EVENTS_DELETE_PARTICIPATION_FETCH_SUCCESS':
      return alterEventParticipation(state, action);
    case 'EVENTS_HIDE_INTEREST':
      return {
        ...state,
        isLoading: true,
      };
    case 'EVENTS_HIDE_INTEREST_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        success: action.payload.success,
        data: action.payload.data,
      };
    case 'EVENTS_PARTICIPANTS_FETCH':
      return {
        ...state,
        isLoading: true,
        participants: null,
      };
    case 'EVENTS_PARTICIPANTS_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        participants: action.payload[0],
      };
    case 'EVENTS_FETCH_BY_ID':
      return {
        ...state,
      };
    case 'EVENTS_FETCH_BY_ID_FETCH_SUCCESS': {
      const event = action.payload;
      event.locked = true;
      return {
        ...state,
        all: [...state.all, event],
      };
    }
    default:
      return state;
  }
};
