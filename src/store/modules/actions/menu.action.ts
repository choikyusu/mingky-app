export const menuAction = {
  SET_MENU: 'menu/SET_MENU',
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
};
