import { menuAction } from '../actions/menu.action';

const initialState: {
  mode: ModeType;
  selectedMenu: MenuType;
  selectedCategory: Category;
} = {
  mode: 'NORMAL',
  selectedMenu: 'HOME_MENU',
  selectedCategory: 'SAVE',
};

export function menuReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case menuAction.SET_MODE:
      return { ...state, mode: action.payload.mode };
    case menuAction.SET_MENU:
      return { ...state, selectedMenu: action.payload.menu };
    case menuAction.SET_CATEGORY:
      return { ...state, selectedCategory: action.payload.category };
    default:
      return state;
  }
}
