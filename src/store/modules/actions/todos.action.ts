export const todoAction = {
  CREATE: "todo/CREATE",
  REMOVE: "todo/REMOVE",
  TOGGLE: "todo/TOGGLE",
  CHANGE_INPUT: "todo/CHANGE_INPUT",
};

export const todoActions = {
  create (params: { text: string }) {
    return {
      type: todoAction.CREATE,
      payload: {
        id: 0,
        text: params.text,
        done: false,
      },
    };
  },
};
