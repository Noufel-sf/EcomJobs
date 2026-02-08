'use client';

import { usePathname } from 'next/navigation';
import Navbarr from '../components/Navbar';
import FooterUi from '../components/Footer';
import TopBar from '@/components/TopBar';


export default function LayoutWrapper({ children }: { children: React.ReactNode  }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isMyAccount = pathname.startsWith('/my-account');

  return (
    <>
      {!isAdmin && !isMyAccount && <TopBar />}
      {!isAdmin && !isMyAccount && <Navbarr />}
      {children}
      {!isAdmin && !isMyAccount && <FooterUi />}
    </>
  );
}
