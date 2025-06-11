import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-[#121212] min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Topbar />
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default DashboardLayout;