import { menuAction } from '../actions/menu.action';

const initialState: { selectedMenu: MenuType } = {
  selectedMenu: 'HOME_MENU',
};

export function menuReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case menuAction.SET_MENU:
      return { ...state, selectedMenu: action.payload.menu };
    default:
      return state;
  }
}
