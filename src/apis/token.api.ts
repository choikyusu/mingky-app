import axios from 'axios';
import { API_HOST } from '../constants/kakao/constants';
import { ApiResponse } from '../types/kakao/base';

export const getNewAccessToken = async (
  token: string,
  refreshToken: string,
) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Refresh: refreshToken,
  };

  const response: ApiResponse<string> = await axios.get(
    `${API_HOST}/token/refresh`,
    {
      headers,
    },
  );

  return response.data.data;
};
