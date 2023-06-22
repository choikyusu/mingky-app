import withAuth from '../../src/kakao/auth/WithAuth';
import { useRef } from 'react';
import MainContainer from '../../src/kakao/components/organisms/container/MainContainer';
import FriendMainContent from '../../src/kakao/components/organisms/container/FriendMainContent';

const useFriends = () => {
  const chatRoomRef: React.MutableRefObject<any> = useRef({});
  const profileRef: React.MutableRefObject<any> = useRef({});

  const onBlockDoubleClick = (type: RoomType, userId: string) => {
    chatRoomRef.current.connectRoom(type, userId);
  };

  const onImageClick = (type: RoomType, friendProfile: UserProfile) => {
    profileRef.current.setPopupProfile(type, friendProfile);
  };

  return {
    chatRoomRef,
    onBlockDoubleClick,
    profileRef,
    onImageClick,
  };
};

const Menu = () => {
  const { profileRef, chatRoomRef, onBlockDoubleClick, onImageClick } =
    useFriends();
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
