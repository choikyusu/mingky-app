import { loginInfoAction } from '../actions/loginInfo.action';

const initialState: { userInfo: UserInfoType } = {
  userInfo: {
    accountType: 'ANONYMOUS',
    id: '',
    name: '',
    email: '',
    gender: '',
    age: '',
  },
};

export function loginInfoReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case loginInfoAction.SET_LOGIN_INFO:
      return { ...state, userInfo: action.payload.userInfo };
    default:
      return state;
  }
}
