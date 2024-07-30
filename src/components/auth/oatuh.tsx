'use client';
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import useOauth from '@/hooks/use-oauth';

const OAuth = () => {
  const { handleOAuthSignin } = useOauth();
  return (
    <Button
      type="button"
      className="mt-3 w-full border border-gray-500 bg-transparent hover:bg-black/10"
      onClick={() => handleOAuthSignin()}
    >
      <Image
        src="/assets/icons/google-icon.svg"
        alt="google logo"
        sizes="40px"
        width={30}
        height={30}
      />
    </Button>
  );
};

export default OAuth;
