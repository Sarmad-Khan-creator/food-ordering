'use client';
import { SigninFormSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '../ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useSignin } from '@/hooks/use-sign-in';
import OAuth from './oatuh';
import Image from 'next/image';

const SignInForm = () => {
  const { handleSignin } = useSignin();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SigninFormSchema>) => {
    try {
      await handleSignin(values.email, values.password);

      toast({
        title: 'Success ��',
        description: 'Successfully signed in',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error ❌',
        description: error as string,
        variant: 'destructive',
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full px-5 md:w-[450px]"
      >
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="relative w-[100px] h-[30px] md:w-[170px] md:h-[50px]">
            <Image src="/assets/icons/logo.png" alt="logo" fill />
          </div>
          <h2 className="text-lg md:text-[16px] font-semibold text-green-700">
            Sign In to your account
          </h2>
        </div>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="border border-gray-400 rounded-md flex flex-row gap-2 items-center px-2">
                  <Input
                    placeholder="Password"
                    {...field}
                    className={`border-none`}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-3 bg-green-600 hover:bg-green-500 w-full"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Continue'}
        </Button>
        <OAuth />
        <div className="w-full flex flex-row items-center justify-between mt-2">
          <p className="text-sm">
            No account?{' '}
            <Link href="/auth/sign-up" className="hover:underline">
              Sign up
            </Link>
          </p>
          <Link
            href="/auth/forgot-password"
            className="text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
