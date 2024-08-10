'use client';
import { adminLinks } from '@/lib/consants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="min-h- py-4 sticky shadow-md overflow-y-auto min-w-[150px] w-[300px] flex-grow flex flex-col gap-14 items-center">
      <div className="relative w-[170px] h-[50px]">
        <Image src="/assets/icons/logo.png" alt="logo" fill />
      </div>
      <div className="flex flex-col gap-3">
        {adminLinks.map((link) => (
          <Link
            href={link.link}
            key={link.link}
            className={cn(
              'flex gap-3 items-center text-white rounded-md px-3 py-2 bg-green-700 hover:bg-green-800 mx-auto w-[200px] min-w-[150px] flex-grow max-sm:w-[150px]',
              pathname.includes(link.link) && 'bg-green-800'
            )}
          >
            {link.icon}
            <p>{link.title}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;
