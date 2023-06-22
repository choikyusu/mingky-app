import {
  $changeProfile,
  $findUser,
  $myProfile,
  $uploadImageFile,
} from '../../apis/user.api';
import { callWrapper } from './base.api.service';

export const findUser = async (
  userId: string,
  cb: (success: boolean, userInfo?: UserInfo) => void,
) => {
  const callApi = async (token: string) => {
    const user = await $findUser(token, userId);
    cb(true, user);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};

export const myProfile = async (
  cb: (success: boolean, userInfo?: UserInfo) => void,
) => {
  const callApi = async (token: string) => {
    const myProfile = await $myProfile(token);
    cb(true, myProfile);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};

export const changeProfile = async (
  userInfo: UserInfo,
  cb: (success: boolean) => void,
) => {
  const callApi = async (token: string) => {
    await $changeProfile(token, userInfo);
    cb(true);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};

export const uploadImageFile = async (
  image: File,
  cb: (success: boolean, imageUrl?: string) => void,
) => {
  const callApi = async (token: string) => {
    const imageUrl = await $uploadImageFile(token, image);
    cb(true, imageUrl);
  };

  const fail = () => {
    cb(false);
  };

  await callWrapper(callApi, fail);
};
