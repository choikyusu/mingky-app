import Image from 'next/image';
import Link from 'next/link';

export function NaverLogin() {
  return (
    <div>
      <Link href="/auth/login/naver">
        <Image alt="" src="/btnG_축약형.png" width={150} height={54} />
      </Link>
    </div>
  );
}
