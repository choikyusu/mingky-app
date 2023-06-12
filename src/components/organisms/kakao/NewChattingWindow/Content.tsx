import styled from 'styled-components';

export const Content = () => {
  return (
    <Styled.ContentWrapper>
      <h6>친구 0</h6>
      <form>
        <ul />
      </form>
    </Styled.ContentWrapper>
  );
};

const MainContent = styled.section`
  position: absolute;
  top: 100px;
  bottom: 5px;
  left: 0px;
  width: 100%;
  overflow: auto;
  & li {
    position: relative;
    padding: 20px 100px 20px 180px;
    & img {
      position: absolute;
      top: 18px;
      left: 120px;
      width: 45px;
      height: 45px;
      border-radius: 15px;
      cursor: pointer;
    }
    & p {
      color: #707070;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-height: 19px;
      font-size: 12px;
      & b {
        color: #000;
        font-weight: bold;
        font-size: 14px;
      }
    }
    &:hover {
      background-color: #eaeaeb;
    }
  }
`;

const Styled = {
  ContentWrapper: styled(MainContent)`
    position: absolute;
    margin: 0;
    top: 120px;
    bottom: 80px;
    left: 0px;
    right: 0px;
    width: 100%;
    overflow: auto;

    & h6 {
      font-size: 12px;
      color: #b4b4b4;
      padding: 10px 20px;
    }
    & li {
      padding-left: 80px;
      & img {
        left: 20px;
        top: 10px;
        cursor: auto;
      }
    }
    & label {
      position: relative;
      display: block;
      width: 100%;
      & input {
        position: absolute;
        top: 25px;
        right: 15px;
      }
      &.selected {
        background-color: #cccccc;
        pointer-events: none;
      }
    }
  `,
};
