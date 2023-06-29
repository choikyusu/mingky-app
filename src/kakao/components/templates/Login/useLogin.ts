import { useState } from 'react';
import { userLogin } from '../../../services/apis/login.api.service';
import { useRouter } from 'next/router';
import { PAGE_PATHS } from '../../../constants/env.constants';
import { LOGIN_FAIL_MESSAGE } from '../../../constants/constants';

export const useLogin = () => {
  const router = useRouter();
  const [loginFailuerMsg, setLoginFailuerMsg] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onUserIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (!loggingIn) {
      const { value } = event.target;
      setUserId(value);
    }
  };

  const onPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();
    if (!loggingIn) {
      const { value } = event.target;
      setPassword(value);
    }
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loggingIn && password.length >= 5) {
      userLogin({ userId, password }, (success: boolean) => {
        if (!success) {
          setLoginFailuerMsg(LOGIN_FAIL_MESSAGE);
          setPassword('');
        } else {
          router.push(PAGE_PATHS.FRIEND);
        }
      });
    }
  };

  return {
    loginFailuerMsg,
    onSubmit,
    userId,
    password,
    onUserIdChange,
    onPasswordChange,
    loggingIn,
  };
};
