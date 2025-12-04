import type React from 'react';
import { Outlet } from 'react-router-dom';
import ProtectedRoutes from '../components/auth/ProtectedRoutes';
import SidebarProvider from '../context/SidebarContext';
import Navbar from './Navbar';
import SideBar from './Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <ProtectedRoutes>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <SideBar />

            {/* main content */}
            <main className="flex-1 h-full p-10 bg-primary-bg overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoutes>
  );
};

export default DashboardLayout;
