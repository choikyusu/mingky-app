import { useEffect } from 'react';

export function NaverLogin() {
  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'yFp3tqSxzQ1anw6XTwWB',
      callbackUrl: 'http://localhost:3000',
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: 'green', // 색상(white, green)
        type: 3, // 버튼타입(1,2,3)
        height: 60, // 배너 및 버튼 높이
      },
    });
    naverLogin.init();
    naverLogin.logout();
    naverLogin.getLoginStatus((status: any) => {
      if (status) {
        console.log('Naver 로그인 상태', naverLogin.user);
        const { id, email, gender } = naverLogin.user;

        // 필수 제공 동의 조건
        if (gender === undefined) {
          alert('성별은 필수 동의 입니다. 정보제공을 동의해주세요.');
          naverLogin.reprompt();
        }
      } else {
        console.log('Naver 비 로그인 상태');
      }
    });
  }, []);

  return <div id="naverIdLogin" />;
}
