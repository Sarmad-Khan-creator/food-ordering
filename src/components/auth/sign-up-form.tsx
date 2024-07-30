'use client';
import { useSignup } from '@/hooks/use-sign-up';
import { SignupFormSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '../ui/use-toast';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
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
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { SignUpProps } from '@/types/types';
import OAuth from './oatuh';

type Props = {
  handleSignup: (data: SignUpProps) => Promise<void>;
};

const SignUpForm = ({ handleSignup }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    try {
      await handleSignup({
        email: values.email,
        password: values.password,
        fName: values.firstName,
        lName: values.lastName,
        username: values.username,
      });

      toast({
        title: 'Success ��',
        description: 'Email verification sent to your email address',
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
            Create Account to continue
          </h2>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          {isSubmitting ? <Loader className="animate-spin" /> : 'Continue'}
        </Button>
        <OAuth />
        <p className="text-center w-full mt-2">
          Already account?{' '}
          <Link href="/auth/sign-in" className="hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
