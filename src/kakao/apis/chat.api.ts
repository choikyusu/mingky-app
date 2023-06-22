import axios from 'axios';
import { API_HOST } from '../constants/constants';
import { ApiResponse } from '../types/base';

export const $createRoom = async (
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
  const createRoomResponse: ApiResponse<CreateRoomResponse> = await axios.post(
    `${API_HOST}/chat/room/create`,
    request,
    { headers },
  );

  return createRoomResponse.data.data;
};

export const $fetchChatMessage = async (token: string, identifier: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const messageResponse: ApiResponse<MessageResponse[]> = await axios.get(
    `${API_HOST}/chat/room/message?identifier=${identifier}&cursor=${0}`,
    { headers },
  );
  return messageResponse.data.data;
};

export const $MyChatRoomList = async (token: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const messageResponse: ApiResponse<ParticipantResponse[]> = await axios.get(
    `${API_HOST}/chat/rooms`,
    { headers },
  );
  return messageResponse.data.data;
};
