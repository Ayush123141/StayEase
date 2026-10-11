import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#F6EFE2] text-[#1C1410]">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:p-10 overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
