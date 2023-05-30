import axios from 'axios';
import { API_HOST } from '../constants/kakao/constants';
import { ApiResponse } from '../types/kakao/base';

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

export const fetchChatting$ = async (token: string, identifier: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const messageResponse: ApiResponse<MessageResponse[]> = await axios.get(
    `${API_HOST}/chat/room?identifier=${identifier}&cursor=${0}`,
    { headers },
  );
  return messageResponse.data.data;
};
