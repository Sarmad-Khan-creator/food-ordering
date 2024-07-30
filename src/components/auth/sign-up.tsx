'use client';
import { useSignup } from '@/hooks/use-sign-up';
import React from 'react';
import SignUpForm from './sign-up-form';
import { InputOTPForm } from './otp';

const Signup = () => {
  const { verifying, handleSignup, handleVerify } = useSignup();
  return (
    <>
      {verifying ? (
        <InputOTPForm handleVerify={handleVerify} />
      ) : (
        <SignUpForm handleSignup={handleSignup} />
      )}
    </>
  );
};

export default Signup;
