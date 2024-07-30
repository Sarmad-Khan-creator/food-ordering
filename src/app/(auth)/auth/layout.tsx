import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { userId } = auth();

  if (userId) {
    return redirect('/');
  }
  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row-reverse">
      <div className="w-full h-[200px] md:flex-1 md:min-h-screen flex items-center justify-center bg-green-800">
        <Image src="/assets/icons/logo.png" alt='logo' width={150} height={70} />
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
