import styled from 'styled-components';

export const ProfileImageSetting = () => {
  return (
    <Styled.ProfileImageSettingWrapper>
      <img src="/asset/base_profile.jpg" alt="profile_image" />
    </Styled.ProfileImageSettingWrapper>
  );
};

export const BgImageSetting = () => {
  return (
    <Styled.BgImageSettingWrapper>
      <i className="fas fa-image" />
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
