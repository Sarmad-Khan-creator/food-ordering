'use client';

import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

export const useSignin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleSignin = async (email: string, password: string) => {
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        throw new Error('Incorrect Password');
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        throw error.errors[0].message;
      }
    }
  };

  return { handleSignin };
};
