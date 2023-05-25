import styled from 'styled-components';
import { Portal } from '../Modal';
import { Header } from './Header';
import { Footer } from './Footer';
import { Content } from './Content';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { createRoom } from '../../../../services/apis/chat.api.service';

export const ChattingRoomContainer = ({
  showChat,
  setShowChat,
  roomInfo,
}: {
  showChat: boolean;
  setShowChat: Dispatch<SetStateAction<boolean>>;
  roomInfo: CreateRoomRequest | undefined;
}) => {
  if (!showChat) return null;

  return (
    <Styled.Wrapper>
      <Header setShowChat={setShowChat} />
      <Content />
      <Footer />
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
