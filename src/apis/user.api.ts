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

export const uploadImageFile$ = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  const imageUrl: ApiResponse<string> = await axios.post(
    `http://localhost:3000/api/kakao/user/profile/upload`,
    formData,
  );
  return `http://localhost:3000/${imageUrl.data.data}`;
};
