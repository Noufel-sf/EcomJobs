'use client';

import Api from '@/lib/Api';
import type { AuthContextType, AuthProviderProps, User } from '@/lib/Types';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const res = await Api.get('/user/showMe');
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await Api.get('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.log(error);
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
