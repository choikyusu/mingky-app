import styled from 'styled-components';
import { FriendChat, MyChat } from './ChatBlock';
import { formatDate } from '../../../../utils/kakao/date.util';
import { useEffect, useRef } from 'react';

export const Content = ({
  profile,
  messageList,
}: {
  profile: UserInfo;
  messageList: MessageResponse[];
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  });
  return (
    <Styled.Wrapper ref={containerRef}>
      {messageList.map(message => {
        if (message.sendUserId === profile.userId)
          return (
            <MyChat
              localeTime={formatDate(message.createdAt, 'a hh:mm')}
              message={message.message}
            />
          );

        return (
          <FriendChat
            localeTime={formatDate(message.createdAt, 'a hh:mm')}
            message={message.message}
          />
        );
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
