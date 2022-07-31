import { useEffect } from 'react';
import stores from '../../../store/configureStore';
import { loginInfoActions } from '../../../store/modules/actions/loginInfo.action';
import { useNavigate } from 'react-router-dom';

export function NaverLogin() {
  const newNavigate = useNavigate();

  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'yFp3tqSxzQ1anw6XTwWB',
      callbackUrl: 'http://localhost:3000/naver_login',
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: 'green', // 색상(white, green)
        type: 3, // 버튼타입(1,2,3)
        height: 60, // 배너 및 버튼 높이
      },
    });
    naverLogin.init();
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
  }, []);

  return (
    <div>
      <div>{stores.getState().loginInfo.userInfo.id}</div>
      <div id="naverIdLogin" />
    </div>
  );
}
