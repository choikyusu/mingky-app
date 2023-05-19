import { login } from '../../apis/login.api';

export const userLogin = async (
  loginData: LoginData,
  cb: (success: boolean, message: string) => void,
) => {
  try {
    const { token, refreshToken } = await login(loginData);
    await window.sessionStorage.setItem('jwt', token);
    await window.sessionStorage.setItem('refreshToken', refreshToken);
    cb(true, '');
  } catch {
    cb(false, '계정 또는 비밀번호를 다시 확인해주세요.');
  }
};
