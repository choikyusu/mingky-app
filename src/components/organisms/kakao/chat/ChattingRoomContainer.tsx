import styled from 'styled-components';
import { Portal } from '../Modal';
import { Header } from './Header';
import { Footer } from './Footer';
import { Content } from './Content';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { createRoom } from '../../../../services/apis/chat.api.service';
import { useSocketIoProvider } from '../SocketIoProvider';

export const ChattingRoomContainer = ({
  showChat,
  setShowChat,
  roomInfo,
}: {
  showChat: boolean;
  setShowChat: Dispatch<SetStateAction<boolean>>;
  roomInfo: CreateRoomRequest | undefined;
}) => {
  if (!showChat || !roomInfo) return null;

  const { socketIo } = useSocketIoProvider();

  const onChatSumbmit = (msg: string) => {
    const chattingRequset = {
      identifier: roomInfo.identifier,
      type: roomInfo.type,
      participant: roomInfo.participant,
      send_user_id: 'test01',
      message: msg,
      not_read: 0,
    };
    // 채팅방 참여자들에게 해당 메시지를 보냅니다.
    socketIo.emit('message', chattingRequset);
  };

  return (
    <Styled.Wrapper>
      <Header setShowChat={setShowChat} />
      <Content />
      <Footer onChatSumbmit={onChatSumbmit} />
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    width: 100%;
    height: 100vh;
    background: #b2c7d9;
  `,
};
