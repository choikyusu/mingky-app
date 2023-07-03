import { $login } from '../../apis/login.api';

export const userLogin = async (
  loginData: LoginData,
  cb: (success: boolean) => void,
) => {
  try {
    const { token, refreshToken } = await $login(loginData);
    await window.localStorage.setItem('token', token);
    await window.localStorage.setItem('refreshToken', refreshToken);
    cb(true);
  } catch {
    cb(false);
  }
};

export const userLogout = (cb: () => void) => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refreshToken');
  cb();
};
