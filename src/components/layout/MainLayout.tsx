import { Outlet } from 'react-router';

import { Header } from '../layout/Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
