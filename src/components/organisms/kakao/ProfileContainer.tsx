import styled from 'styled-components';
import { Modal } from './Modal';
import { SetStateAction } from 'react';
import { UserProfile } from './UserProfile';
import { Menu } from './Menu';

export const ProfileContainer = ({
  isProfileShown,
  profile,
  setIsProfileShown,
}: {
  isProfileShown: boolean;
  profile?: UserInfo;
  setIsProfileShown: (value: SetStateAction<boolean>) => void;
}) => {
  if (!isProfileShown) return null;

  return (
    <Modal>
      <Styled.Wrapper>
        <Styled.BackgroundBase>
          {profile?.backgroundUrl !== '' && (
            <img src={profile?.backgroundUrl} alt="bg" />
          )}
        </Styled.BackgroundBase>
        <Styled.CancelIcon
          className="fas fa-times"
          onClick={() => setIsProfileShown(false)}
        />
        <UserProfile />
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
