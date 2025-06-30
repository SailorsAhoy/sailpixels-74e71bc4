
import { ReactNode } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pb-20">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
