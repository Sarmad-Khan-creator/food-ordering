'use client';
import { SignUpProps } from '@/types/types';
import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useSignup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  const handleSignup = async ({
    email,
    password,
    fName,
    lName,
    username,
  }: SignUpProps) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: fName,
        lastName: lName,
        username: username,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerifying(true);
    } catch (err: any) {
      if (isClerkAPIResponseError(err)) {
        throw err.errors[0].message;
      }
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error('Error:', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        throw err.errors[0].message;
      }
    }
  };

  return { handleSignup, handleVerify, verifying };
};
