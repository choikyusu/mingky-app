import axios from 'axios';
import { API_HOST } from '../constants/kakao/constants';

export const createRoom$ = async (
  token: string,
  roomInfo: CreateRoomRequest,
) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const request = {
    roomInfo,
  };
  await axios.post(`${API_HOST}/chat/room/create`, request, { headers });
};
