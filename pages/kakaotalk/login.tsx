import Link from 'next/link';
import styled from 'styled-components';

const Login = () => {
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Header>
          <img src="/asset/kakao_logo.png" alt="logo" />
        </Styled.Header>
        <Styled.Footer>
          <ul>
            <li>
              <Link href="/singin">회원 가입</Link>
            </li>
          </ul>
        </Styled.Footer>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #f5f6f7;
    padding: 25px 0;
  `,
  Container: styled.div`
    width: 360px;
    height: 600px;
    background-color: #ffeb33;
  `,
  Header: styled.header`
    width: 100%;
    height: 200px;
    padding-top: 100px;
    & img {
      display: block;
      margin: 0 auto;
    }
  `,
  Footer: styled.footer`
    & ul {
      display: flex;
      justify-content: center;
      & li {
        color: #5a5a5a;
      }
    }
  `,
};

export default Login;
