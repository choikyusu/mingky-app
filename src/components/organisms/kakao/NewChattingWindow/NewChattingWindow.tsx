import styled from 'styled-components';
import { Modal } from '../Modal';
import { Dispatch, SetStateAction } from 'react';
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';

export const NewChattingWindow = ({
  isopenFindFriend,
  openFindFriend,
}: {
  isopenFindFriend: boolean;
  openFindFriend: Dispatch<SetStateAction<boolean>>;
}) => {
  if (!isopenFindFriend) return null;
  return (
    <Modal>
      <Styled.Wrapper>
        <Styled.CancelIcon
          className="fas fa-times"
          title="닫기"
          onClick={() => openFindFriend(false)}
        />
        <Header />
        <Content />
        <Footer />
      </Styled.Wrapper>
    </Modal>
  );
};

const Styled = {
  Wrapper: styled.div`
    position: relative;
    width: 380px;
    height: 90vh;
    border: 1px solid #969696;
    margin: auto;
    color: #000;
    background: #fff;
  `,
  CancelIcon: styled.i`
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 15px;
    color: #000;
    z-index: 100;
    cursor: pointer;
  `,
};
