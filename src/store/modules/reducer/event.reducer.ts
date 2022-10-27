import { eventAction } from '../actions/event.action';

const initialState: { eventList: { [id: string]: EventItem } } = {
  eventList: {} as { [id: string]: EventItem },
};

export function eventReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case eventAction.INITIALIZE:
      return initialState;
    case eventAction.SET_EVENT_LIST: {
      const { eventList }: { eventList: EventItem[] } = action.payload;
      const newEvent: { [id: string]: EventItem } = {};
      eventList.forEach(event => {
        newEvent[event.id] = event;
      });

      return {
        ...state,
        eventList: newEvent,
      };
    }
    case eventAction.ADD_EVENT_ITEM: {
      const { event } = action.payload;
      const newEvent = state.eventList;
      newEvent[event.id] = event;
      return {
        ...state,
        eventList: { ...newEvent },
      };
    }
    case eventAction.UPDATE_EVENT_ITEM: {
      const { event } = action.payload;
      const newEvent = state.eventList;
      newEvent[event.id] = event;

      return {
        ...state,
        eventList: { ...newEvent },
      };
    }
    default:
      return state;
  }
}
