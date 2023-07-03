import { PAGE_PATHS } from '@/src/kakao/constants/env.constants';
import { myProfile } from '@/src/kakao/services/apis/user.api.service';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    myProfile((success: boolean, userInfo?: UserInfo) => {
      if (success && userInfo) {
        router.push(PAGE_PATHS.FRIEND);
      } else {
        router.push(PAGE_PATHS.LOGIN);
      }
    });
  }, []);

  return <div />;
};

export default Home;
