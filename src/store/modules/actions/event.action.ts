export const eventAction = {
  INITIALIZE: 'event/INITIALIZE' as const,
  ADD_EVENT_ITEM: 'event/ADD_EVENT_ITEM' as const,
  UPDATE_EVENT_ITEM: 'event/UPDATE_EVENT_ITEM' as const,
};

export const eventActions = {
  initialize: () => {
    return { type: eventAction.INITIALIZE };
  },
  addEventItem: (payload: { event: EventItem }) => {
    return { type: eventAction.ADD_EVENT_ITEM, payload };
  },
  updateEventItem: (payload: { event: EventItem }) => {
    return { type: eventAction.UPDATE_EVENT_ITEM, payload };
  },
};
