import styled from 'styled-components';
import { ImageSetting } from './ImageSetting';
import { changeProfile } from '../../../services/apis/user.api.service';
import { Dispatch, SetStateAction, useState } from 'react';

export const ProfileImageSetting = ({
  profile,
  setProfile,
}: {
  profile: UserInfo;
  setProfile: Dispatch<SetStateAction<UserInfo | undefined>>;
}) => {
  const [isShowSetting, showSetting] = useState(false);
  const changeImage = async (imageUrl: string) => {
    await changeProfile({ ...profile, baseUrl: imageUrl }, success => {
      if (success) setProfile({ ...profile, baseUrl: imageUrl });
    });
  };

  return (
    <Styled.ProfileImageSettingWrapper>
      <img
        aria-hidden
        src={
          profile.baseUrl === '' ? '/asset/base_profile.jpg' : profile.baseUrl
        }
        alt="profile_image"
        onClick={() => showSetting(true)}
      />
      <ImageSetting
        isShowSetting={isShowSetting}
        showSetting={showSetting}
        changeImage={changeImage}
      />
    </Styled.ProfileImageSettingWrapper>
  );
};

export const BgImageSetting = ({
  profile,
  setProfile,
}: {
  profile: UserInfo;
  setProfile: Dispatch<SetStateAction<UserInfo | undefined>>;
}) => {
  const [isShowSetting, showSetting] = useState(false);
  const changeImage = async (imageUrl: string) => {
    await changeProfile({ ...profile, backgroundUrl: imageUrl }, success => {
      if (success) setProfile({ ...profile, backgroundUrl: imageUrl });
    });
  };

  return (
    <Styled.BgImageSettingWrapper>
      <i
        aria-hidden
        className="fas fa-image"
        onClick={() => showSetting(true)}
      />
      <ImageSetting
        isShowSetting={isShowSetting}
        showSetting={showSetting}
        changeImage={changeImage}
      />
    </Styled.BgImageSettingWrapper>
  );
};

const Styled = {
  ProfileImageSettingWrapper: styled.div`
    position: relative;
    display: inline-block;
    margin: auto;
    margin-bottom: 10px;
    & img {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 35px;
      cursor: pointer;
    }
  `,
  BgImageSettingWrapper: styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    & i {
      font-size: 15px;
      color: #fff;
      cursor: pointer;
    }
  `,
};
