export const loginInfoAction = {
  SET_LOGIN_INFO: 'userInfo/SET_LOGIN_INFO',
  SET_NAME: 'userInfo/SET_NAME',
};

export const loginInfoActions = {
  setLoginInfo(params: { userInfo: UserInfoType }) {
    return {
      type: loginInfoAction.SET_LOGIN_INFO,
      payload: {
        userInfo: params.userInfo,
      },
    };
  },
  setName(params: { name: string }) {
    return {
      type: loginInfoAction.SET_NAME,
      payload: {
        name: params.name,
      },
    };
  },
};
