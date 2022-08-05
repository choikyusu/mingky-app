export const loginInfoAction = {
  SET_LOGIN_INFO: 'loginInfo/SET_LOGIN_INFO',
  SET_NAME: 'loginInfo/SET_NAME',
  SET_PUSH: 'loginInfo/SET_PUSH',
  SET_TOP_FIX: 'loginInfo/SET_TOP_FIX',
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
  setPush(params: { push: boolean }) {
    return {
      type: loginInfoAction.SET_PUSH,
      payload: {
        push: params.push,
      },
    };
  },
  setTopFix(params: { topFix: boolean }) {
    return {
      type: loginInfoAction.SET_TOP_FIX,
      payload: {
        topFix: params.topFix,
      },
    };
  },
};
