import type React from 'react';
import { Outlet } from 'react-router-dom';
import ProtectedRoutes from '../components/auth/ProtectedRoutes';
import Navbar from './Navbar';
import SideBar from './Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <ProtectedRoutes>
      <div className="flex flex-col h-screen w-4/4">
        <Navbar />
        <div className="flex h-full">
          <SideBar />

          {/* main content */}
          <main className="w-4/4 p-10 bg-primary-bg overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default DashboardLayout;
