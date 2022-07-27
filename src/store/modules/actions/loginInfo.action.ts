export const loginInfoAction = {
  SET_LOGIN_INFO: 'userInfo/SET_LOGIN_INFO',
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
};
