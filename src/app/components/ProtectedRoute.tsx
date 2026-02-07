'use client';

import { useAppSelector } from '@/Redux/hooks';
import { useRouter } from 'next/navigation';
import { Spinner } from './ui/Spinner';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" show={true} className="">
          Loading...
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return null;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
