import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { userSignup } from '../../src/services/apis/signup.api.service';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const MAX_LEN = 20;
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [name, setName] = useState('');

  const [userIdWarningMsg, setUserIdWarningMsg] = useState('');
  const [pwWarningMsg, setPwWarningMsg] = useState('');
  const [checkPwWarningMsg, setCheckPwWarningMsg] = useState('');
  const [nameWarningMsg, setNameWarningMsg] = useState('');

  const onUserIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { value } = event.target;
    setUserId(value);
  };

  const onPwChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { value } = event.target;
    setPw(value);
  };
  const onCheckPwChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();
    const { value } = event.target;
    setCheckPw(value);
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { value } = event.target;
    setName(value);
  };

  const isMatchUserId = (): boolean => {
    const regExp = /^[0-9a-z]+$/;
    const isMatch = userId.match(regExp);
    return !!isMatch;
  };
  const isValidUserId = async () => {
    const len = userId.length;
    if (len < 5 || !isMatchUserId()) {
      setUserIdWarningMsg('5 ~ 20자의 영문 소문자, 숫자만 사용 가능합니다.');
      return false;
    }
    // else if (await findUser(userId)) {
    //   await setUserIdWarningMsg('이미 사용중이거나 탈퇴한 아이디입니다.');
    //   return false;
    // }
    setUserIdWarningMsg('');
    return true;
  };
  const isValidPw = (): boolean => {
    const len = pw.length;
    if (len < 5) {
      setPwWarningMsg('5 ~ 20자 입력해주세요.');
      return false;
    }
    setPwWarningMsg('');
    return true;
  };
  const isValidCheckPw = (): boolean => {
    if (checkPw !== pw) {
      setCheckPwWarningMsg('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setCheckPwWarningMsg('');
    return true;
  };
  const isValidName = (): boolean => {
    const len = name.length;
    if (len === 0) {
      setNameWarningMsg('필수 정보입니다.');
      return false;
    }
    setNameWarningMsg('');
    return true;
  };

  // 입력 창에서 벗어날 때 발생하는 action
  const onUserIdBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.preventDefault();
    isValidUserId();
  };
  const onPwBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.preventDefault();
    isValidPw();
  };
  const onCheckPwBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.preventDefault();
    isValidCheckPw();
  };
  const onNameBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.preventDefault();
    isValidName();
  };

  const onSubmit = async () => {
    const validId = await isValidUserId();
    const validPw = isValidPw();
    const validCheckPw = isValidCheckPw();
    const validName = isValidName();

    if (validId && validPw && validCheckPw && validName) {
      userSignup({ userId, password: pw, name }, async (success: boolean) => {
        if (success) router.push('/kakaotalk/login');
        else alert('서버 접속에 실패했습니다.');
      });
    }
  };
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Header>
          <h2>
            <Styled.LogoLink href="/kakaotalk/login">kakao</Styled.LogoLink>
          </h2>
        </Styled.Header>
        <Styled.Contants>
          <label htmlFor="id">
            <h3>아이디</h3>
            <span>
              <input
                id="id"
                type="text"
                maxLength={MAX_LEN}
                onChange={onUserIdChange}
                onBlur={onUserIdBlur}
              />
            </span>
            <p>{userIdWarningMsg}</p>
          </label>
          <label htmlFor="password">
            <h3>비밀번호</h3>
            <span>
              <input
                id="password"
                type="password"
                maxLength={MAX_LEN}
                onChange={onPwChange}
                onBlur={onPwBlur}
              />
            </span>
            <p>{pwWarningMsg}</p>
          </label>
          <label htmlFor="password2">
            <h3>비밀번호 재확인</h3>
            <span>
              <input
                id="password2"
                type="password"
                maxLength={MAX_LEN}
                onChange={onCheckPwChange}
                onBlur={onCheckPwBlur}
              />
            </span>
            <p>{checkPwWarningMsg}</p>
          </label>
          <label htmlFor="name">
            <h3>이름</h3>
            <span>
              <input
                id="name"
                type="text"
                maxLength={MAX_LEN}
                onChange={onNameChange}
                onBlur={onNameBlur}
              />
            </span>
            <p>{nameWarningMsg}</p>
          </label>
          <button type="submit" onClick={onSubmit}>
            가입하기
          </button>
        </Styled.Contants>
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Signup;

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #f5f6f7;
  `,
  Container: styled.div`
    margin: 0 auto;
    width: 50%;
    min-height: 95vh;
    border: 1px solid #dadada;
    @media only screen and (max-width: 800px) {
      width: 95%;
    }
  `,
  Header: styled.header`
    width: 100%;
    height: 100px;
    & h2 {
      text-align: center;
    }
  `,
  LogoLink: styled(Link)`
    font-size: 50px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 8px;
    color: #ffeb33;
    text-shadow: -1px 0 #dcdcdc, 0 1px #dcdcdc, 1px 0 #dcdcdc, 0 -1px #dcdcdc;
  `,
  Contants: styled.main`
    width: 100%;
    & label,
    button {
      display: block;
      width: 80%;
      margin: 0 auto;
    }
    & label span,
    button {
      padding: 16px 5px;
      border: 1px solid #dadada;
    }
    & label {
      margin-bottom: 20px;
    }
    & label span {
      display: block;
      background-color: #fff;
      & input {
        border: none;
        width: 100%;
        outline: 0;
        padding: 0 15px;
      }
    }
    & label h3 {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    & button {
      background-color: #ffeb33;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
    }
    & p {
      color: red;
    }
  `,
};
