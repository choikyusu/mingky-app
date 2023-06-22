import axios from 'axios';
import { API_HOST } from '../constants/constants';
import { ApiResponse } from '../types/base';

export const $login = async (loginData: LoginData) => {
  const request = {
    userId: loginData.userId,
    password: loginData.password,
  };
  const response: ApiResponse<LoginResponseDto> = await axios.post(
    `${API_HOST}/auth/login`,
    request,
  );
  const { token, refreshToken } = response.data.data;

  return { token, refreshToken };
};
