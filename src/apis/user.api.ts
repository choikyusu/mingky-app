import axios from 'axios';
import { ApiResponse } from '../types/kakao/base';

export const myProfile$ = async (token: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response: ApiResponse<UserResponseDto> = await axios.get(
    `http://localhost:3000/api/kakao/user/profile/me`,
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

  await axios.post(
    `http://localhost:3000/api/kakao/user/profile/change`,
    userInfoRequest,
    { headers },
  );
};
