import { myProfile$ } from '../../apis/user.api';

export const myProfile = async (
  cb: (success: boolean, userInfo?: UserInfo) => void,
) => {
  const token = window.sessionStorage.getItem('token');
  if (token) {
    const myProfile = await myProfile$(token);
    cb(true, myProfile);
  }

  cb(false);
};
