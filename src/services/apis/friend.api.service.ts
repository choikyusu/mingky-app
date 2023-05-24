import { AxiosError } from 'axios';
import { addFriendRequest$, getFriend$ } from '../../apis/friend.api';
import { HOST } from '../../constants/kakao/constants';

export const addFriend = async (
  friendId: string,
  cb: (success: boolean) => void,
) => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      await addFriendRequest$(token, friendId);
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

export const getFriend = async (
  cb: (success: boolean, userFriend?: UserFriend) => void,
) => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      const userFriend = await getFriend$(token);
      cb(true, userFriend);
    }

    cb(false);
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) window.location.href = `${HOST}/login`;

      cb(false);
    }
  }
};
