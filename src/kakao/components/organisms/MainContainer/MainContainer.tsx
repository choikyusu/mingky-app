import { JSXElementConstructor, ReactElement } from 'react';
import styled from 'styled-components';
import { useMainContainer } from './useMainContainer';
import { ProfileContainer } from '../../modals/ProfileContainer/ProfileContainer';
import { ChattingRoomContainer } from '../../modals/ChattingRoomContainer/ChattingRoomContainer';
import MenuSideBar from '../MenuSideBar/MenuSideBar';

export interface MainContainerProps {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | readonly ReactElement<any, string | JSXElementConstructor<any>>[];
}

const MainContainer = ({ children }: MainContainerProps) => {
  const {
    profile,
    setProfile,
    profileRef,
    showChat,
    setShowChat,
    chatRoomRef,
    renderChildrenWithProps,
  } = useMainContainer({ children });

  return (
    <Styled.Wrapper>
      <ProfileContainer
        profile={profile}
        setProfile={setProfile}
        ref={profileRef}
      />
      <ChattingRoomContainer
        showChat={showChat}
        setShowChat={setShowChat}
        profile={profile}
        ref={chatRoomRef}
      />
      <Styled.Container>
        <MenuSideBar />
        {renderChildrenWithProps()}
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
