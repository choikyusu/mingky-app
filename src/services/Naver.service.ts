let naverLogin: any = null;

export function login() {
  naverLogin = new window.naver.LoginWithNaverId({
    clientId: 'yFp3tqSxzQ1anw6XTwWB',
    callbackUrl: 'http://localhost:3002/naver_login',
    callbackHandle: true,
    isPopup: false,
    loginButton: {
      color: 'green', // 색상(white, green)
      type: 3, // 버튼타입(1,2,3)
      height: 60, // 배너 및 버튼 높이
    },
  });
  naverLogin.init();
  return !!naverLogin;
}

export function getNaverLogin() {
  return naverLogin;
}

export function logout() {
  if (naverLogin) {
    naverLogin.logout();
    naverLogin = null;
  }
  return !naverLogin;
}
