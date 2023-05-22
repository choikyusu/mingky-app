import axios from 'axios';
import { ApiResponse } from '../types/kakao/base';
import { API_HOST } from '../constants/kakao/constants';

export const login$ = async (loginData: LoginData) => {
  const request = {
    user_id: loginData.userId,
    password: loginData.password,
  };
  const response: ApiResponse<LoginResponseDto> = await axios.post(
    `${API_HOST}/auth/login`,
    request,
  );
  const { token, refreshToken } = response.data.data;

  return { token, refreshToken };
};
