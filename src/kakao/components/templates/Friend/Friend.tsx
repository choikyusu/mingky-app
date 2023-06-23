import withAuth from '../../../auth/WithAuth';
import MainContainer from '../../organisms/container/MainContainer';
import FriendMainContent from '../../organisms/container/FriendMainContent';
import { useFriend } from './useFriend';

const Friend = () => {
  const { profileRef, chatRoomRef, onBlockDoubleClick, onImageClick } =
    useFriend();
  return (
    <MainContainer profileRef={profileRef} chatRoomRef={chatRoomRef}>
      <FriendMainContent
        onBlockDoubleClick={onBlockDoubleClick}
        onImageClick={onImageClick}
      />
    </MainContainer>
  );
};

export default withAuth(Friend);
