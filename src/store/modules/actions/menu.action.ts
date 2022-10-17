export const menuAction = {
  SET_MENU: 'menu/SET_MENU',
  SET_CATEGORY: 'menu/SET_CATEGORY',
};

export const menuActions = {
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
