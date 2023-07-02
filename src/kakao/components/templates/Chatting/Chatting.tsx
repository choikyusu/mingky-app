import MainContainer from '../../organisms/MainContainer/MainContainer';
import ChatMainContent from '../../organisms/ChatMainContent/ChatMainContent';
import withAuth from '../../../auth/WithAuth';

const Chatting = () => {
  return (
    <MainContainer>
      <ChatMainContent />
    </MainContainer>
  );
};

export default withAuth(Chatting);
