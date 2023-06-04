import styled from 'styled-components';

export const MyChat = ({
  message,
  localeTime,
  date,
}: {
  message: string;
  localeTime: string;
  date: string;
}) => {
  return (
    <>
      {date ? <SeparationBlock date={date} /> : null}
      <Styled.RightBlock>
        <div>
          <Styled.ChatWrapper>
            {message}
            {localeTime ? <span className="time">{localeTime}</span> : null}
          </Styled.ChatWrapper>
        </div>
      </Styled.RightBlock>
    </>
  );
};

export const FriendChat = ({
  message,
  localeTime,
  date,
}: {
  message: string;
  localeTime: string;
  date: string;
}) => {
  return (
    <>
      {date ? <SeparationBlock date={date} /> : null}
      <Styled.LeftBlock>
        <div>
          <Styled.ChatWrapper>
            {message}
            {localeTime ? <span className="time">{localeTime}</span> : null}
          </Styled.ChatWrapper>
        </div>
      </Styled.LeftBlock>
    </>
  );
};

export const SeparationBlock = ({ date }: { date: string }) => {
  return (
    <Styled.BorderBlock>
      <span>{date}</span>
    </Styled.BorderBlock>
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
  BorderBlock: styled.div`
    position: relative;
    text-align: center;
    width: 100%;
    padding: 13px 0;
    & span {
      position: relative;
      display: inline-block;
      background-color: #b2c7d9;
      padding: 0 10px;
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 2%;
      top: 50%;
      width: 96%;
      height: 1px;
      background-color: #727b83;
    }
  `,
};
