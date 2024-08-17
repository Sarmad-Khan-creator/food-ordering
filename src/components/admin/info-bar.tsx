'use client';
import { adminLinks } from '@/lib/consants';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { DotIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Skeleton } from '../ui/skeleton';

const Infobar = () => {
  const pathname = usePathname();
  const activeLink = adminLinks.find((link) => link.link === pathname);
  return (
    <div className="h-[80px] w-full shadow-sm flex px-5 justify-between items-center">
      <h2 className="text-lg font-semibold">{activeLink?.title}</h2>
      <ClerkLoading>
        <Skeleton className="h-14 w-14 rounded-full bg-gray-400" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-14 w-14',
            },
          }}
        />
      </ClerkLoaded>
    </div>
  );
};

export default Infobar;
