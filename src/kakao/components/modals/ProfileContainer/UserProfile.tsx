import styled from 'styled-components';
import { BgImageSetting, ProfileImageSetting } from './SettingBlock';
import { Dispatch, SetStateAction } from 'react';

interface UserInfoProps {
  profile: UserInfo;
  popupProfile: {
    type: ProfileWindowType;
    profile: UserProfile;
  };
  setChangePopupType: Dispatch<SetStateAction<ChangePopupType>>;
  setProfile: Dispatch<SetStateAction<UserInfo>>;
}

export const UserProfile = ({
  profile,
  popupProfile,
  setChangePopupType,
  setProfile,
}: UserInfoProps) => {
  return (
    <Styled.Wrapper>
      <BgImageSetting
        profile={profile}
        popupProfile={popupProfile}
        setProfile={setProfile}
      />
      <ProfileImageSetting
        profile={profile}
        popupProfile={popupProfile}
        setProfile={setProfile}
      />
      <Styled.ProfileText>
        <p>
          <b>{popupProfile.profile.nickName}</b>
        </p>
        <i
          aria-hidden
          role="button"
          className="fas fa-pen"
          onClick={() => setChangePopupType('NickName')}
        />
      </Styled.ProfileText>
      <Styled.ProfileText>
        <p>{popupProfile.profile.message}</p>

        {popupProfile.type === 'Me' && (
          <i
            aria-hidden
            role="button"
            className="fas fa-pen"
            onClick={() => setChangePopupType('Message')}
          />
        )}
      </Styled.ProfileText>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.section`
    width: 100%;
    height: 450px;
    padding-top: 300px;
  `,
  ProfileText: styled.div`
    position: relative;
    & p {
      display: inline-block;
      max-width: 80%;
      padding-right: 5px;
      min-height: 19px;
      font-size: 13px;
      color: #ffffff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      & b {
        font-size: 16px;
        font-weight: bold;
      }
    }
    & i {
      position: absolute;
      bottom: 10px;
      cursor: pointer;
    }
  `,
};
