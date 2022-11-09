import { editAction } from '../actions/edit.action';

const initialState = {
  editId: '',
  title: '',
  contents: '',
};

export function editReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case editAction.INITIALIZE:
      return initialState;
    case editAction.SET_EDIT_ID:
      return {
        ...state,
        editId: action.payload.editId,
      };
    case editAction.SET_CONTENTS:
      return {
        ...state,
        title: action.payload.title,
        contents: action.payload.contents,
      };

    default:
      return state;
  }
}
