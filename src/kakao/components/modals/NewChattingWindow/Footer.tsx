import styled from 'styled-components';

export const Footer = () => {
  return (
    <Styled.FooterWrapper>
      <button type="button" className="confirm">
        확인
      </button>
      <button type="button" className="cancel">
        취소
      </button>
    </Styled.FooterWrapper>
  );
};

const Styled = {
  FooterWrapper: styled.div`
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 80px;
    border-top: 1px solid #dcdcdc;
    text-align: right;
    & button {
      position: relative;
      transform: translateY(50%);
      border: 1px solid #dcdcdc;
      background: #fff;
      padding: 10px 25px;
      margin-right: 10px;
      cursor: pointer;
      &.confirm {
        background: #fee500;
        &:hover {
          background: #fada0a;
        }
      }
      &.disabled {
        color: #969696;
        background: #e2e2e2;
        pointer-events: none;
      }
      &.cancel {
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  `,
};
