'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { navLinks } from '@/lib/consants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { IUser } from '@/models/user';

const Topbar = ({ user }: { user: Partial<IUser> }) => {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between py-3 px-10 shadow-sm sticky">
      <Link href="/">
        <Image
          src="/assets/icons/logo.png"
          alt="logo"
          width={150}
          height={70}
        />
      </Link>
      <nav>
        <ul className="flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.link}>
              <Link
                href={link.link}
                className={cn(
                  'hover:underline',
                  pathname === link.link && 'underline'
                )}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <SignedIn>
        <div className="flex gap-5 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href="/user/cart">
                  <div className="relative left-0 top-2 bottom-0 right-0">
                    <ShoppingBag size={30} />
                    <div className="size-4 text-xs rounded-full bg-red-500 text-white relative bottom-8 left-4">
                      {user.cart?.length}
                    </div>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cart</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link href="/user/wishlist">
                  <div className="relative left-0 top-2 bottom-0 right-0">
                    <Heart size={30} />
                    <div className="size-4 text-xs rounded-full bg-red-500 text-white relative bottom-8 left-4">
                      {user.wishlist?.length}
                    </div>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ClerkLoaded>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'h-14 w-14',
                },
              }}
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Skeleton className="h-14 w-14 rounded-full bg-gray-400" />
          </ClerkLoading>
        </div>
      </SignedIn>
      <SignedOut>
        <Link
          href="/auth/sign-in"
          className="py-2 px-7 rounded-md bg-green-500 text-white hover:bg-green-700"
        >
          Sign in
        </Link>
      </SignedOut>
    </div>
  );
};

export default Topbar;
