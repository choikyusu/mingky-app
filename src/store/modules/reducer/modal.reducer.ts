import { modalAction } from '../actions/modal.action';

const initialState = {
  dialog: {
    id: '',
    data: {},
  },
};

export function modalReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case modalAction.INITIALIZE:
      return initialState;
    case modalAction.SET_DIALOG_STATUS:
      return {
        ...state,
        dialog: {
          id: action.payload.id,
          data: action.payload.data || {},
        },
      };

    default:
      return state;
  }
}
