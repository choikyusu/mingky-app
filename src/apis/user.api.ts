import axios from 'axios';
import { ApiResponse } from '../types/kakao/base';
import { API_HOST, HOST } from '../constants/kakao/constants';

export const findUser$ = async (token: string, userId: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const foundUser: ApiResponse<UserResponseDto> = await axios.get(
    `${API_HOST}/user/${userId}`,
    headers,
  );
  return foundUser.data.data;
};

export const myProfile$ = async (token: string) => {
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

export const changeProfile$ = async (token: string, userInfo: UserInfo) => {
  const userInfoRequest: ProfileRequestDto = {
    nick_name: userInfo.nickName,
    base_url: userInfo.baseUrl,
    background_url: userInfo.backgroundUrl,
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

export const uploadImageFile$ = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  const imageUrl: ApiResponse<string> = await axios.post(
    `${API_HOST}/user/profile/upload`,
    formData,
  );
  return `${HOST}/${imageUrl.data.data}`;
};
