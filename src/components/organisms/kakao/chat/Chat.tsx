import styled from 'styled-components';

export const Chat = ({ children }: { children: React.ReactNode }) => {
  return <Styled.ChatWrapper>{children}</Styled.ChatWrapper>;
};

const Styled = {
  ChatWrapper: styled.div`
    position: relative;
    display: inline-block;
    padding: 7px 8px;
    border-radius: 4px;
    margin-bottom: 7px;
    box-shadow: 0px 1px 2px 0px #8fabc7;
    max-width: 70%;
    word-wrap: break-word;
    white-space: pre-wrap;
  `,
};
