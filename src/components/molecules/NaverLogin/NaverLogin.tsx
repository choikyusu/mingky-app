import { useEffect } from 'react';
import { RootState } from '../../../store/configureStore';
import { getNaverLogin, login } from '../../../services/Naver.service';
import { loginInfoActions } from '../../../store/modules/actions/loginInfo.action';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export function NaverLogin() {
  const userInfo = useSelector((state: RootState) => state.loginInfo.userInfo);

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (login()) {
      const naverLogin = getNaverLogin();
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          const { id, email, gender, name, age } = naverLogin.user;
          if (email === undefined) {
            naverLogin.reprompt();
          } else {
            dispatch(
              loginInfoActions.setLoginInfo({
                userInfo: {
                  accountType: 'MEMBER',
                  id,
                  name,
                  email,
                  gender,
                  age,
                },
              }),
            );
            router.push('/');
          }
        } else {
          console.log('Naver 비 로그인 상태');
        }
      });
    }
  }, []);

  return (
    <div>
      <div>{userInfo.id}</div>
      <div id="naverIdLogin" />
    </div>
  );
}
