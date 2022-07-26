export const userInfoAction = {
  SET_USER_INFO: 'userInfo/SET_USER_INFO',
};

export const userInfoActions = {
  setUserInfo(params: { userInfo: UserInfoType }) {
    return {
      type: userInfoAction.SET_USER_INFO,
      payload: {
        userInfo: params.userInfo,
      },
    };
  },
};
