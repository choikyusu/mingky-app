import styled from 'styled-components';
import { BgImageSetting, ProfileImageSetting } from './SettingBlock';

export const UserProfile = ({ profile }: { profile: UserInfo }) => {
  return (
    <Styled.Wrapper>
      <BgImageSetting />
      <ProfileImageSetting profile={profile} />
      <Styled.ProfileText>
        <p>
          <b>{profile.name}</b>
        </p>
        <i className="fas fa-pen" />
      </Styled.ProfileText>
      <Styled.ProfileText>
        <p>{profile.message}</p>

        <i className="fas fa-pen" />
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
