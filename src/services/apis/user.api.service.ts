import { AxiosError } from 'axios';
import { changeProfile$, myProfile$ } from '../../apis/user.api';
import { HOST } from '../../constants/kakao/constants';

export const myProfile = async (
  cb: (success: boolean, userInfo?: UserInfo) => void,
) => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      const myProfile = await myProfile$(token);
      cb(true, myProfile);
    }

    cb(false);
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) window.location.href = `${HOST}/login`;

      cb(false);
    }
  }
};

export const changeProfile = async (
  userInfo: UserInfo,
  cb: (success: boolean) => void,
) => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      await changeProfile$(token, userInfo);

      cb(true);
    }

    cb(false);
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) window.location.href = `${HOST}/login`;

      cb(false);
    }
  }
};
