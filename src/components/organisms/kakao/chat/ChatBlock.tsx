import styled from 'styled-components';
import { Chat } from './Chat';

export const MyChat = ({ message }: { message: string }) => {
  return (
    <Styled.RightBlock>
      <div>
        <Chat>{message}</Chat>
      </div>
    </Styled.RightBlock>
  );
};

export const FriendChat = ({ message }: { message: string }) => {
  return (
    <Styled.LeftBlock>
      <div>
        <Chat>{message}</Chat>
      </div>
    </Styled.LeftBlock>
  );
};

const Styled = {
  RightBlock: styled.div`
    text-align: right;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;

    & div > div {
      background-color: #ffec42;
      text-align: left;

      & span {
        position: absolute;
        display: inline-block;
        &.time {
          min-width: 65px;
          text-align: right;
          bottom: 0;
          left: -70px;
        }
        &.not-read {
          color: #ffec42;
          min-width: 30px;
          text-align: right;
          bottom: 16px;
          left: -35px;
        }
      }
    }
  `,
  LeftBlock: styled.div`
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 50px;

    & div > div {
        background-color: #fff;
        & span {
            position: absolute;
            &.time {
              min-width: 65px;
              text-align: left;
              bottom: 0;
              right: -70px;
            }
            &.not-read {
              color: #ffec42;
              min-width: 30px;
              text-align: left;
              bottom: 16px;
              right: -35px;
            }
          }
        }
        & img {
          position: absolute;
          top: 3px;
          left: 0;
          height: 45px;
          width: 45px;
          border-radius: 20px;
          float: left;
          cursor: pointer;
        }
    }
  `,
};
