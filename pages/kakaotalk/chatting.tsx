import withAuth from '../../src/kakao/auth/WithAuth';

import { useRef } from 'react';
import MainContainer from '../../src/kakao/components/organisms/container/MainContainer';
import ChatMainContent from '../../src/kakao/components/organisms/container/ChatMainContent';

const Menu = () => {
  const chatRoomRef: React.MutableRefObject<any> = useRef({});
  const profileRef: React.MutableRefObject<any> = useRef({});

  const onBlockDoubleClick = (type: RoomType, userId: string) => {
    chatRoomRef.current.connectRoom(type, userId);
  };

  const onImageClick = (type: RoomType, friendProfile: UserProfile) => {
    profileRef.current.setPopupProfile(type, friendProfile);
  };

  return (
    <MainContainer profileRef={profileRef} chatRoomRef={chatRoomRef}>
      <ChatMainContent
        onBlockDoubleClick={onBlockDoubleClick}
        onImageClick={onImageClick}
      />
    </MainContainer>
  );
};

export default withAuth(Menu);
