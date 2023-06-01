import { $createRoom, $fetchChatting } from '../../apis/chat.api';
import { callWrapper } from './base.api.service';

export const createRoom = async (
  roomInfo: CreateRoomRequest,
  cb: (success: boolean, createRoom?: CreateRoomResponse) => void,
) => {
  const callApi = async (token: string) => {
    const createRoom = await $createRoom(token, roomInfo);
    cb(true, createRoom);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};

export const fetchChatting = async (
  identifier: string,
  cb: (success: boolean, messageList?: MessageResponse[]) => void,
) => {
  const callApi = async (token: string) => {
    const messageList = await $fetchChatting(token, identifier);
    cb(true, messageList);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};
