import { useState } from 'react';
import styled from 'styled-components';

export const Footer = ({
  onChatSumbmit,
}: {
  onChatSumbmit: (msg: string) => void;
}) => {
  const [message, setMessage] = useState('');
  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setMessage(value);
  };

  const requestSubmit = () => {
    onChatSumbmit(message);
    setMessage('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    requestSubmit();
  };

  return (
    <Styled.Wrapper>
      <form onSubmit={onSubmit}>
        <textarea value={message} onChange={onMessageChange} />
        <button className="canSubmit" type="submit">
          전송
        </button>
      </form>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.footer`
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    min-height: 50px;
    max-height: 200px;
    overflow: auto;
    padding: 6px;
    z-index: 100;
    background-color: #eeeeee;
    & form {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      & textarea,
      button {
        display: inline-block;
        border: none;
        outline: none;
      }
      & textarea {
        width: 100%;
        resize: none;
        height: 100%;
        margin: 0;
        padding: 5px 20px;
      }
      & button {
        width: 50px;
        height: 40px;
        background: #ffeb33;
        &.canSubmit {
          cursor: pointer;
          pointer-events: all;
          color: #000;
        }
        &.cannotSubmit {
          pointer-events: none;
          color: #b4b4b4;
        }
      }
    }
  `,
};
