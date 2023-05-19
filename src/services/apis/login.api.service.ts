import { login$ } from '../../apis/login.api';

export const userLogin = async (
  loginData: LoginData,
  cb: (success: boolean, message: string) => void,
) => {
  try {
    const { token, refreshToken } = await login$(loginData);
    await window.sessionStorage.setItem('token', token);
    await window.sessionStorage.setItem('refreshToken', refreshToken);
    cb(true, '');
  } catch {
    cb(false, '계정 또는 비밀번호를 다시 확인해주세요.');
  }
};

export const userLogout = (cb: () => void) => {
  window.sessionStorage.removeItem('token');
  window.sessionStorage.removeItem('refreshToken');
  cb();
};
