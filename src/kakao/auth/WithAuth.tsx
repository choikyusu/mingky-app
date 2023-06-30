import { useRouter } from 'next/router';
import { PAGE_PATHS } from '../constants/env.constants';

const withAuth = <P extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WrapperComponent: React.FC<P> = props => {
    const router = useRouter();
    if (typeof window !== 'undefined') {
      const token = window.sessionStorage.getItem('token');
      console.log(token);
      if (!token) {
        router.push(PAGE_PATHS.LOGIN);
      }
    }

    return <WrappedComponent {...props} />;
  };

  return WrapperComponent;
};

export default withAuth;
