export const eventAction = {
  INITIALIZE: 'event/INITIALIZE' as const,
  SET_EVENT_ITEM: 'event/SET_EVENT_ITEM' as const,
};

export const eventActions = {
  initialize: () => {
    return { type: eventAction.INITIALIZE };
  },
  setEventItem: (payload: { event: EventItem }) => {
    return { type: eventAction.SET_EVENT_ITEM, payload };
  },
};
