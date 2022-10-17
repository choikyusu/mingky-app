import { menuAction } from '../actions/menu.action';

const initialState: { selectedMenu: MenuType; selectedCategory: Category } = {
  selectedMenu: 'HOME_MENU',
  selectedCategory: 'SAVE',
};

export function menuReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case menuAction.SET_MENU:
      return { ...state, selectedMenu: action.payload.menu };
    case menuAction.SET_CATEGORY:
      return { ...state, selectedCategory: action.payload.category };
    default:
      return state;
  }
}
