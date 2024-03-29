import styled from 'styled-components';
import { Modal } from '../Modal/Modal';
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useState,
  useImperativeHandle,
  ForwardedRef,
} from 'react';
import { UserProfile } from './UserProfile';
import { Menu } from './Menu';
import { ProfileInputWindow } from './ProfileInputWindow';
import { changeProfile } from '@/src/kakao/services/apis/user.api.service';

interface ProfileContainerProps {
  profile: UserInfo;
  setProfile: Dispatch<SetStateAction<UserInfo>>;
}

export const ProfileContainer = forwardRef(
  ({ profile, setProfile }: ProfileContainerProps, ref: ForwardedRef<any>) => {
    const [changePopupType, setChangePopupType] = useState<ChangePopupType>('');
    const [popupProfile, setPopupProfile] = useState<{
      type: ProfileWindowType;
      profile: UserProfile;
    }>();

    const changeName = (value: string) => {
      if (popupProfile) {
        const newProfile: UserInfo = { ...profile };
        if (changePopupType === 'NickName') newProfile.nickName = value;
        if (changePopupType === 'Message') newProfile.message = value;
        changeProfile(newProfile, success => {
          if (success) setProfile(newProfile);
        });
      }
    };

    useImperativeHandle(ref, () => ({
      setPopupProfile: (type: RoomType, friendProfile: UserProfile) => {
        if (type === 'OneToOne') {
          setPopupProfile({
            type: 'Friend',
            profile: friendProfile,
          });
        } else if (type === 'Individual') {
          setPopupProfile({
            type: 'Me',
            profile,
          });
        }
      },
    }));

    if (!popupProfile) return null;
    return (
      <Modal>
        <ProfileInputWindow
          currentValue={
            changePopupType === 'NickName'
              ? popupProfile.profile.nickName
              : popupProfile.profile.message
          }
          maxLength={changePopupType === 'NickName' ? 20 : 60}
          setChangePopupType={setChangePopupType}
          changeProfile={changeName}
          changePopupType={changePopupType}
        />
        <Styled.Wrapper>
          <Styled.BackgroundBase>
            {popupProfile.profile.backgroundUrl !== '' && (
              <img src={popupProfile.profile.backgroundUrl} alt="bg" />
            )}
          </Styled.BackgroundBase>
          <Styled.CancelIcon
            className="fas fa-times"
            onClick={() => setPopupProfile(undefined)}
          />
          <UserProfile
            profile={profile}
            popupProfile={popupProfile}
            setProfile={setProfile}
            setChangePopupType={setChangePopupType}
          />
          <Menu popupProfile={popupProfile} />
        </Styled.Wrapper>
      </Modal>
    );
  },
);

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
