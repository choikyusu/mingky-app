import { AxiosError } from 'axios';
import { HOST } from '../../constants/kakao/constants';
import { createRoom$ } from '../../apis/chat.api';

export const createRoom = async (
  roomInfo: CreateRoomRequest,
  cb: (success: boolean) => void,
) => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      await createRoom$(token, roomInfo);
      cb(true);
    }

    cb(false);
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 409) {
        cb(true);
      }
      if (err.response?.status === 401) window.location.href = `${HOST}/login`;

      cb(false);
    }
  }
};
