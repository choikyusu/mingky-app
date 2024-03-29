import axios from 'axios';
import { API_HOST, HOST } from '../constants/env.constants';
import { ApiResponse } from '../types/base';

export const $findUser = async (token: string, userId: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const foundUser: ApiResponse<UserResponseDto> = await axios.get(
    `${API_HOST}/user/${userId}`,
    { headers },
  );
  return foundUser.data.data;
};

export const $myProfile = async (token: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response: ApiResponse<UserResponseDto> = await axios.get(
    `${API_HOST}/user/profile/me`,
    { headers },
  );

  return { ...response.data.data, code: response.status };
};

export const $changeProfile = async (token: string, userInfo: UserInfo) => {
  const userInfoRequest: ProfileRequestDto = {
    nickName: userInfo.nickName,
    profileUrl: userInfo.profileUrl,
    backgroundUrl: userInfo.backgroundUrl,
    message: userInfo.message,
  };

  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  await axios.post(`${API_HOST}/user/profile/change`, userInfoRequest, {
    headers,
  });
};

export const $uploadImageFile = async (token: string, image: File) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const formData = new FormData();
  formData.append('image', image);
  const imageUrl: ApiResponse<string> = await axios.post(
    `${API_HOST}/image/profile/upload`,
    formData,
  );
  return `${HOST}/${imageUrl.data.data}`;
};
