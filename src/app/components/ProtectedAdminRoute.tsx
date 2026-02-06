'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Spinner } from './ui/Spinner';
import NotAuthorizedPage from '@/pages/NotAuthorizedPage';



const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  let router = useRouter();
  const { user, loading } = useAuth();

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
