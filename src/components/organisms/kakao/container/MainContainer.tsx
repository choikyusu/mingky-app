import {
  Children,
  JSXElementConstructor,
  ReactElement,
  cloneElement,
  useEffect,
  useState,
} from 'react';
import { myProfile } from '../../../../services/apis/user.api.service';
import styled from 'styled-components';
import { ProfileContainer } from '../ProfileContainer';
import { ChattingRoomContainer } from '../chat/ChattingRoomContainer';
import MenuSideBar from '../MenuSideBar';

const MainContainer = ({
  children,
  profileRef,
  chatRoomRef,
}: {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | readonly ReactElement<any, string | JSXElementConstructor<any>>[];
  profileRef: React.MutableRefObject<any>;
  chatRoomRef: React.MutableRefObject<any>;
}) => {
  const [profile, setProfile] = useState<UserInfo>({
    userId: '',
    name: '',
    nickName: '',
    message: '',
    profileUrl: '',
    backgroundUrl: '',
    friendList: [],
  });

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    myProfile((success: boolean, userInfo?: UserInfo) => {
      if (success && userInfo) {
        setProfile(userInfo);
      }
    });
  }, []);

  const renderChildrenWithProfile = () => {
    return Children.map(children, child => {
      return cloneElement(child, {
        profile,
      });
    });
  };

  return (
    <Styled.Wrapper>
      <ProfileContainer
        profile={profile}
        setProfile={setProfile}
        profileRef={profileRef}
      />
      <ChattingRoomContainer
        showChat={showChat}
        setShowChat={setShowChat}
        profile={profile}
        chatRoomRef={chatRoomRef}
      />
      <Styled.Container>
        <MenuSideBar />
        {renderChildrenWithProfile()}
      </Styled.Container>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    width: 100%;
  `,
  Container: styled.main`
    width: 100%;
    display: flex;
  `,
};

export default MainContainer;
