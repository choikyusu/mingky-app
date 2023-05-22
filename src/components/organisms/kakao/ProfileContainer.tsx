import styled from 'styled-components';
import { Modal } from './Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { UserProfile } from './UserProfile';
import { Menu } from './Menu';
import { ProfileInputWindow } from './ProfileInputWindow';
import { changeProfile } from '../../../services/apis/user.api.service';

export const ProfileContainer = ({
  isProfileShown,
  profile,
  setIsProfileShown,
  setProfile,
}: {
  isProfileShown: boolean;
  profile?: UserInfo;
  setIsProfileShown: (value: SetStateAction<boolean>) => void;
  setProfile: Dispatch<SetStateAction<UserInfo | undefined>>;
}) => {
  if (!isProfileShown || !profile) return null;

  const [changePopupType, setChangePopupType] = useState<ChangePopupType>('');

  const changeName = (value: string) => {
    if (profile) {
      const newProfile: UserInfo = { ...profile };
      if (changePopupType === 'NickName') newProfile.nickName = value;
      if (changePopupType === 'Message') newProfile.message = value;
      changeProfile(newProfile, success => {
        if (success) setProfile(newProfile);
      });
    }
  };

  return (
    <Modal>
      <ProfileInputWindow
        currentValue={
          changePopupType === 'NickName' ? profile.nickName : profile.message
        }
        maxLength={changePopupType === 'NickName' ? 20 : 60}
        setChangePopupType={setChangePopupType}
        changeProfile={changeName}
        changePopupType={changePopupType}
      />
      <Styled.Wrapper>
        <Styled.BackgroundBase>
          {profile.backgroundUrl !== '' && (
            <img src={profile.backgroundUrl} alt="bg" />
          )}
        </Styled.BackgroundBase>
        <Styled.CancelIcon
          className="fas fa-times"
          onClick={() => setIsProfileShown(false)}
        />
        <UserProfile
          profile={profile}
          setChangePopupType={setChangePopupType}
        />
        <Menu />
      </Styled.Wrapper>
    </Modal>
  );
};

const Styled = {
  Wrapper: styled.main`
    width: 360px;
    height: 580px;
    margin: auto;
    color: #fff;
    text-align: center;
  `,
  BackgroundBase: styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #848b91;
    z-index: -1;
    & img {
      width: 100%;
      height: 100%;
      opacity: 0.6;
    }
  `,
  CancelIcon: styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #fff;
    z-index: 100;
    cursor: pointer;
  `,
};
