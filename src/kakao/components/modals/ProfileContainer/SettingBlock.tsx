import styled from 'styled-components';
import { ImageSetting } from './ImageSetting';
import { Dispatch, SetStateAction, useState } from 'react';
import { changeProfile } from '@/src/kakao/services/apis/user.api.service';
import { BASE_IMG_URL } from '@/src/kakao/constants/env.constants';

const userSettingBlock = ({
  profile,
  setProfile,
}: {
  profile: UserInfo;
  setProfile: Dispatch<SetStateAction<UserInfo>>;
}) => {
  const [isShowSetting, showSetting] = useState(false);
  const changeImage = async (imageUrl: string) => {
    await changeProfile({ ...profile, profileUrl: imageUrl }, success => {
      if (success) setProfile({ ...profile, profileUrl: imageUrl });
    });
  };

  return { isShowSetting, showSetting, changeImage };
};

interface ProfileImageSettingProps {
  profile: UserInfo;
  popupProfile: {
    type: ProfileWindowType;
    profile: UserProfile;
  };
  setProfile: Dispatch<SetStateAction<UserInfo>>;
}

export const ProfileImageSetting = ({
  profile,
  popupProfile,
  setProfile,
}: ProfileImageSettingProps) => {
  const { isShowSetting, showSetting, changeImage } = userSettingBlock({
    profile,
    setProfile,
  });

  return (
    <Styled.ProfileImageSettingWrapper type={popupProfile.type}>
      <img
        aria-hidden
        src={popupProfile.profile.profileUrl || BASE_IMG_URL}
        alt="profile_image"
        onClick={() => popupProfile.type === 'Me' && showSetting(true)}
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
  popupProfile,
  setProfile,
}: ProfileImageSettingProps) => {
  const [isShowSetting, showSetting] = useState(false);
  const changeImage = async (imageUrl: string) => {
    await changeProfile({ ...profile, backgroundUrl: imageUrl }, success => {
      if (success) setProfile({ ...profile, backgroundUrl: imageUrl });
    });
  };

  if (popupProfile.type === 'Friend') return null;
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
  ProfileImageSettingWrapper: styled.div<{ type: ProfileWindowType }>`
    position: relative;
    display: inline-block;
    margin: auto;
    margin-bottom: 10px;
    & img {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 35px;
      ${props => props.type === 'Me' && 'cursor: pointer;'}
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
