'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;
    if (session) {
      if (session.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/app');
      }
    } else {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') return <p>Загрузка...</p>;

  return <div></div>;
}
