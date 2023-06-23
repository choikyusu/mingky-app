import { useRouter } from 'next/router';
import { userSignup } from '../../../services/apis/signup.api.service';
import { useState } from 'react';

export const useSignup = () => {
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

  return {
    MAX_LEN,
    onUserIdChange,
    onUserIdBlur,
    userIdWarningMsg,
    onPwChange,
    onPwBlur,
    pwWarningMsg,
    onCheckPwChange,
    onCheckPwBlur,
    checkPwWarningMsg,
    onNameChange,
    onNameBlur,
    nameWarningMsg,
    onSubmit,
  };
};
