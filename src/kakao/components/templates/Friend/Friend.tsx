import withAuth from '../../../auth/WithAuth';
import MainContainer from '../../organisms/MainContainer/MainContainer';
import FriendMainContent from '../../organisms/FriendMainContent/FriendMainContent';

const Friend = () => {
  return (
    <MainContainer>
      <FriendMainContent />
    </MainContainer>
  );
};

export default withAuth(Friend);
