import { AxiosError } from 'axios';
import { HOST } from '../../../constants/env.constants';
import { getNewAccessToken } from '../../../apis/token.api';

export const callWrapper = async (
  callApi: (token: string) => Promise<void>,
  fail: () => void,
  retry?: boolean,
) => {
  try {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      await callApi(token);
    } else {
      fail();
    }
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401 && !retry) {
        const token = window.sessionStorage.getItem('token');
        const refreshToken = window.sessionStorage.getItem('refreshToken');
        if (token && refreshToken) {
          const newToken = await getNewAccessToken(token, refreshToken);
          window.sessionStorage.setItem('token', newToken);

          callWrapper(callApi, fail, true);
        }
        return;
      }

      window.location.href = `${HOST}/login`;
      fail();
    }
  }
};
