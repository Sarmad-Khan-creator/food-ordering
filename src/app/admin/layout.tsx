import { getUserByClerkId } from '@/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const user = await getUserByClerkId(userId!);
  if (userId && user.role === 'USER') {
    redirect('/unauthorized');
  }
  return <div>{children}</div>;
};

export default AdminLayout;
