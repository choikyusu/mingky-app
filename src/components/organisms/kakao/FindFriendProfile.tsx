import styled from 'styled-components';

export const FindFriendProfile = () => {
  return (
    <Styled.FindNull>
      <p>xxxx를 찾을 수 없습니다.</p>
    </Styled.FindNull>
  );
};

const Styled = {
  FindNull: styled.div`
    text-align: center;
    & p {
      padding-top: 50px;
      font-size: 15px;
      font-weight: bold;
    }
  `,
};
