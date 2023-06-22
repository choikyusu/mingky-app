import axios from 'axios';
import { API_HOST } from '../constants/constants';
import { ApiResponse } from '../types/base';

export const $addFriendRequest = async (token: string, friendId: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const request = {
    friendId,
  };
  const addedFriend: ApiResponse<boolean> = await axios.post(
    `${API_HOST}/friend/add`,
    request,
    { headers },
  );
  return addedFriend.data.data;
};
