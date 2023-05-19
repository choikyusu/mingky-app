import axios from 'axios';
import { ApiResponse } from '../types/kakao/base';

export const login$ = async (loginData: LoginData) => {
  const request = {
    user_id: loginData.userId,
    password: loginData.password,
  };
  const response: ApiResponse<LoginResponseDto> = await axios.post(
    `http://localhost:3000/api/kakao/auth/login`,
    request,
  );
  const { token, refreshToken } = response.data.data;

  return { token, refreshToken };
};
