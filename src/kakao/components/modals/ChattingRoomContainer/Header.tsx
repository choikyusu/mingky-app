import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useSocketIoProvider } from '../../../provider/SocketIoProvider/SocketIoProvider';

interface HeaderProps {
  setShowChat: Dispatch<SetStateAction<boolean>>;
  roomName: string;
}

export const Header = ({ setShowChat, roomName }: HeaderProps) => {
  const { socketIo } = useSocketIoProvider();

  return (
    <Styled.Wrapper>
      <button
        type="button"
        onClick={() => {
          if (!socketIo) return;

          socketIo.off('message');
          setShowChat(false);
        }}
      >
        <i className="fas fa-arrow-left" />
      </button>
      <span>{roomName}</span>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.header`
    width: 100%;
    background-color: #a9bdce;
    height: 50px;
    & span {
      display: inline-block;
      font-weight: bold;
      font-size: 20px;
      margin-left: 10px;
      margin-top: 10px;
    }
    & button {
      font-size: 20px;
      padding: 10px 10px 10px 30px;
      background-color: #a9bdce;
      outline: none;
      cursor: pointer;
      &:hover {
        color: #dcdcdc;
      }
    }
  `,
};
