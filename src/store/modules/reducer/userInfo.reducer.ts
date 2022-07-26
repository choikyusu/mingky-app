import { userInfoAction } from '../actions/userInfo.action';

const initialState: { userInfo: UserInfoType } = {
  userInfo: {
    accountType: 'ANONYMOUS',
    userName: '',
    email: '',
    gender: '',
    birthOfYear: '',
    phone: '',
  },
};

export function userInfoReducer(
  state = initialState,
  action: { type: string; payload?: any; error?: boolean },
) {
  switch (action.type) {
    case userInfoAction.SET_USER_INFO:
      return { ...state, userInfo: action.payload.userInfo };
    default:
      return state;
  }
}
