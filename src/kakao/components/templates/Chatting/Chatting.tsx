import { useRef } from 'react';
import MainContainer from '../../organisms/MainContainer/MainContainer';
import ChatMainContent from '../../organisms/ChatMainContent/ChatMainContent';
import withAuth from '../../../auth/WithAuth';

const Chatting = () => {
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

export default withAuth(Chatting);