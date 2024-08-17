import { getUserByClerkId } from '@/actions/user.action';
import Infobar from '@/components/admin/info-bar';
import AdminSidebar from '@/components/admin/sidebar';
import { UserButton } from '@clerk/nextjs';
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
        <Infobar />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
