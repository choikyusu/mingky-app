import { eventAction } from '../actions/event.action';

const initialState: { eventList: EventItem[] } = {
  eventList: [],
};

export function eventReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case eventAction.INITIALIZE:
      return initialState;
    case eventAction.SET_EVENT_ITEM:
      return {
        ...state,
        eventList: [...state.eventList, action.payload.event],
      };

    default:
      return state;
  }
}
