import axios from 'axios';
import { ApiResponse } from '../types/kakao/base';

export const myProfile$ = async (token: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response: ApiResponse<UserResponseDto> = await axios.get(
    `http://localhost:3000/api/kakao/user/me`,
    { headers },
  );

  return { ...response.data.data };
};
