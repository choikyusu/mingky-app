import styled from 'styled-components';
import { FriendChat, MyChat } from './ChatBlock';
import { formatDate } from '../../../utils/date.util';
import { useEffect, useRef } from 'react';

interface ContentProps {
  profile: UserInfo;
  messageList: MessageResponse[];
  lastReadChatNoList: number[];
}

export const Content = ({
  profile,
  messageList,
  lastReadChatNoList,
}: ContentProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  });

  return (
    <Styled.Wrapper ref={containerRef}>
      {messageList.map((message, index) => {
        const prevDate = formatDate(
          messageList?.[index - 1]?.createdAt,
          'YYYYMMDD',
        );
        const nextTime = formatDate(
          messageList?.[index + 1]?.createdAt,
          'a hh:mm',
        );

        const currentTime = formatDate(message.createdAt, 'a hh:mm');
        const date = formatDate(message.createdAt, 'YYYYMMDD');

        const nextUserId = messageList?.[index + 1]?.sendUserId;

        if (message.sendUserId === profile.userId)
          return (
            <MyChat
              localeTime={
                currentTime !== nextTime || nextUserId !== message.sendUserId
                  ? currentTime
                  : ''
              }
              message={message.message}
              date={
                prevDate !== date
                  ? formatDate(message.createdAt, 'YYYY년 MM월 DD일 ddd요일')
                  : ''
              }
              notRead={lastReadChatNoList.reduce(
                (previousValue, currentValue) => {
                  const value = currentValue < message.index ? 1 : 0;
                  return previousValue + value;
                },
                0,
              )}
            />
          );

        return (
          <FriendChat
            localeTime={
              currentTime !== nextTime || nextUserId !== message.sendUserId
                ? currentTime
                : ''
            }
            message={message.message}
            date={
              prevDate !== date
                ? formatDate(message.createdAt, 'YYYY년 MM월 DD일 ddd요일')
                : ''
            }
            notRead={lastReadChatNoList.reduce(
              (previousValue, currentValue) => {
                const value = currentValue < message.index ? 1 : 0;
                return previousValue + value;
              },
              0,
            )}
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
