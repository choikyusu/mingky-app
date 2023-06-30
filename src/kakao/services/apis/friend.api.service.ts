import { $addFriendRequest } from '../../apis/friend.api';
import { callWrapper } from './base/base.api.service';

export const addFriend = async (
  friendId: string,
  cb: (success: boolean) => void,
) => {
  const callApi = async (token: string) => {
    await $addFriendRequest(token, friendId);
    cb(true);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};
