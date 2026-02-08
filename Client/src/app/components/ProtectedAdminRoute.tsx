'use client';

import { useAppSelector } from '@/Redux/hooks';
import { useRouter } from 'next/navigation';
import { Spinner } from './ui/Spinner';
import NotAuthorizedPage from '@/pages/NotAuthorizedPage';



const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  let router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    router.push('/login');
  }

  if (user?.role !== 'ADMIN') {
    return <NotAuthorizedPage />;
  }
  return children;
};

export default ProtectedAdminRoute;
