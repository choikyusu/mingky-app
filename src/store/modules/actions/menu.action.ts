export const menuAction = {
  SET_MENU: 'menu/SET_MENU',
  SET_CATEGORY: 'menu/SET_CATEGORY',
  SET_MODE: 'menu/SET_MODE',
};

export const menuActions = {
  setMode(params: { mode: ModeType }) {
    return {
      type: menuAction.SET_MODE,
      payload: {
        menu: params.mode,
      },
    };
  },
  setMenu(params: { menu: MenuType }) {
    return {
      type: menuAction.SET_MENU,
      payload: {
        menu: params.menu,
      },
    };
  },
  setCategory(params: { category: Category }) {
    return {
      type: menuAction.SET_CATEGORY,
      payload: {
        category: params.category,
      },
    };
  },
};
