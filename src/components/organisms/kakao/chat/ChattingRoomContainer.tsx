import styled from 'styled-components';
import { Portal } from '../Modal';
import { Header } from './Header';
import { Footer } from './Footer';
import { Content } from './Content';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  createRoom,
  fetchChatting,
} from '../../../../services/apis/chat.api.service';
import { useSocketIoProvider } from '../SocketIoProvider';

export const ChattingRoomContainer = ({
  showChat,
  setShowChat,
  roomInfo,
  profile,
}: {
  showChat: boolean;
  setShowChat: Dispatch<SetStateAction<boolean>>;
  roomInfo: CreateRoomRequest | undefined;
  profile: UserInfo;
}) => {
  if (!showChat || !roomInfo) return null;

  const [messageList, setMessageList] = useState<
    { index: number; message: string; sendUserId: string }[]
  >([]);

  const { socketIo } = useSocketIoProvider();

  const onChatSumbmit = (message: string) => {
    const chattingRequset = {
      identifier: roomInfo.identifier,
      type: roomInfo.type,
      participantList: roomInfo.participantList,
      sendUserId: profile.userId,
      message,
      notRead: 0,
    };
    // 채팅방 참여자들에게 해당 메시지를 보냅니다.
    socketIo.emit('message', chattingRequset);
  };

  useEffect(() => {
    fetchChatting(roomInfo.identifier, (success, messageList) => {
      if (success && messageList) setMessageList(messageList);
    });
  }, []);

  return (
    <Styled.Wrapper>
      <Header setShowChat={setShowChat} />
      <Content messageList={messageList} profile={profile} />
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
