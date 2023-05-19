import { useRouter } from 'next/router';

const withAuth = <P extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WrapperComponent: React.FC<P> = props => {
    const router = useRouter();
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token');
      if (!token) {
        router.push('/kakaotalk/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
      }
    }

    // 로그인 토큰이 있을 때만 WrappedComponent를 렌더링
    return <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default withAuth;
