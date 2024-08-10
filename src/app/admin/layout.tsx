import { getUserByClerkId } from '@/actions/user.action';
import AdminSidebar from '@/components/admin/sidebar';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const user = await getUserByClerkId(userId!);
  if (userId && user.role === 'USER') {
    redirect('/unauthorized');
  }
  return (
    <div className="min-h-screen flex w-full">
      <AdminSidebar />
      <div className="flex flex-col gap-5 w-full">
        <div className="h-[80px] w-full bg-blue-400"></div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
