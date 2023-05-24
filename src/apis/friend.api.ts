import axios from 'axios';
import { API_HOST } from '../constants/kakao/constants';
import { ApiResponse } from '../types/kakao/base';

export const getFriend$ = async (token: string): Promise<UserFriend> => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const friendList: ApiResponse<FriendResponseDto> = await axios.get(
    `${API_HOST}/friend/list`,
    { headers },
  );
  return {
    userId: friendList.data.data.user_id,
    friendList: friendList.data.data.friend_list,
  };
};

export const addFriendRequest$ = async (token: string, friendId: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const request = {
    friend_id: friendId,
  };
  const addedFriend: ApiResponse<boolean> = await axios.post(
    `${API_HOST}/friend/add`,
    request,
    { headers },
  );
  return addedFriend.data.data;
};
