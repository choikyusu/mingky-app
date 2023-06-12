import styled from 'styled-components';

export const Header = () => {
  return (
    <Styled.HeaderWrapper>
      <h4>대화 상대 선택</h4>
      <input placeholder="이름 검색" />
    </Styled.HeaderWrapper>
  );
};

const Styled = {
  HeaderWrapper: styled.div`
    width: 100%;
    height: 120px;
    & h4 {
      padding: 25px 20px;
      font-size: 18px;
      font-weight: 600;
    }
    & input {
      display: block;
      outline: none;
      border: 1px solid #969696;
      border-radius: 20px;
      background-color: #f6f6f7;
      width: 90%;
      padding: 8px 15px;
      margin: 0 auto;
      &:focus {
        &::placeholder {
          color: #f6f6f7;
        }
      }
    }
  `,
};
