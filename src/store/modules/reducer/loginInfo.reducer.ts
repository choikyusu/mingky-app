import { loginInfoAction } from '../actions/loginInfo.action';

const initialState: { userInfo: UserInfoType; settingInfo: SettingInfoType } = {
  userInfo: {
    accountType: 'ANONYMOUS',
    id: '',
    name: '',
    email: '',
    gender: '',
    birthYear: '',
    mobile: '',
  },
  settingInfo: {
    push: true,
    topFix: true,
  },
};

export function loginInfoReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case loginInfoAction.SET_LOGIN_INFO:
      return { ...state, userInfo: action.payload.userInfo };
    case loginInfoAction.SET_NAME:
      return {
        ...state,
        userInfo: { ...state.userInfo, name: action.payload.name },
      };
    case loginInfoAction.SET_PUSH:
      return {
        ...state,
        settingInfo: { ...state.settingInfo, push: action.payload.push },
      };
    case loginInfoAction.SET_TOP_FIX:
      return {
        ...state,
        settingInfo: { ...state.settingInfo, topFix: action.payload.topFix },
      };
    default:
      return state;
  }
}
