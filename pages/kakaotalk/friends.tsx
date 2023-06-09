import withAuth from '../../src/auth/WithAuth';
import MainContainer from '../../src/components/organisms/kakao/container/MainContainer';
import FriendMainContent from '../../src/components/organisms/kakao/container/FriendMainContent';
import { useRef } from 'react';

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
      <FriendMainContent
        onBlockDoubleClick={onBlockDoubleClick}
        onImageClick={onImageClick}
      />
    </MainContainer>
  );
};

export default withAuth(Menu);
