import {
  $MyChatRoomList,
  $createRoom,
  $fetchChatMessage,
} from '../../apis/chat.api';
import { callWrapper } from './base/base.api.service';

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

export const fetchChatMessage = async (
  identifier: string,
  cb: (success: boolean, messageList?: MessageResponse[]) => void,
) => {
  const callApi = async (token: string) => {
    const messageList = await $fetchChatMessage(token, identifier);
    cb(true, messageList);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};

export const MyChatRoomList = async (
  cb: (success: boolean, roomList?: ParticipantResponse[]) => void,
) => {
  const callApi = async (token: string) => {
    const roomList = await $MyChatRoomList(token);
    cb(true, roomList);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};
