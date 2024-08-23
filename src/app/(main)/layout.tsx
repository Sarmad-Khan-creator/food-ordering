import { getUserByClerkId } from '@/actions/user.action';
import Topbar from '@/components/main/top-bar';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const MainLayout = async ({ children }: Props) => {
  const clerkUser = await currentUser()
  const user = await getUserByClerkId(clerkUser?.id!)
  return (
    <main className="min-h-screen flex flex-col">
      <Topbar user={JSON.parse(user)} />
      {children}
    </main>
  );
};

export default MainLayout;
