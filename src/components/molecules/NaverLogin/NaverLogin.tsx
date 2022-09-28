import { useEffect } from 'react';
import stores from '../../../store/configureStore';
import { getNaverLogin, login } from '../../../services/Naver.service';
import { useNavigate } from 'react-router-dom';
import { loginInfoActions } from '../../../store/modules/actions/loginInfo.action';

export function NaverLogin() {
  const newNavigate = useNavigate();
  useEffect(() => {
    if (login()) {
      const naverLogin = getNaverLogin();
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          const { id, email, gender, name, age } = naverLogin.user;
          if (email === undefined) {
            naverLogin.reprompt();
          } else {
            stores.dispatch(
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
            newNavigate('/');
          }
        } else {
          console.log('Naver 비 로그인 상태');
        }
      });
    }
  }, []);

  return (
    <div>
      <div>{stores.getState().loginInfo.userInfo.id}</div>
      <div id="naverIdLogin" />
    </div>
  );
}
