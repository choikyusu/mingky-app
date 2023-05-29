import styled from 'styled-components';
import { FriendChat, MyChat } from './ChatBlock';

export const Content = ({
  profile,
  messageList,
}: {
  profile: UserInfo;
  messageList: { index: number; message: string; sendUserId: string }[];
}) => {
  console.log(messageList);
  return (
    <Styled.Wrapper>
      {messageList.map(message => {
        if (message.sendUserId === profile.userId)
          return <MyChat message={message.message} />;

        return <FriendChat message={message.message} />;
      })}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.main`
    position: absolute;
    top: 50px;
    bottom: 65px;
    left: 0px;
    right: 0px;
    overflow: auto;
    width: 100%;
  `,
};
