"use client"
import { SignIn, useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useState } from 'react';

const useForgotPassword = () => {
  const { signIn, setActive } = useSignIn();
  const [isSuccessfulCreateion, setIsSuccessfulCreateion] = useState(false);

//   if (!isLoaded) return;
  async function create(email: string) {
    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      setIsSuccessfulCreateion(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        throw error.errors[0].message;
      }
    }
  }

  async function reset(code: string, password: string) {
    if (!signIn) return;

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      if (result?.status === 'complete') {
        setActive({ session: result.createdSessionId });
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        throw error.errors[0].longMessage;
      }
    }
  }

  return {
    create,
    reset,
    isSuccessfulCreateion,
  };
};

export default useForgotPassword;
