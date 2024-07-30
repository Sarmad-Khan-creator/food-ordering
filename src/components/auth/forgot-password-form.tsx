'use client';

import useForgotPassword from '@/hooks/use-forgot-password';
import { ForgotPasswordSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { toast } from '../ui/use-toast';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const ForgotPasswordForm = () => {
  const { create, reset, isSuccessfulCreateion } = useForgotPassword();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
      code: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      if (isSuccessfulCreateion) {
        await reset(data.code, data.password);

        toast({
          title: 'Success',
          description: 'Password reset successfully!',
          variant: 'success',
        });
      } else {
        await create(data.email);

        toast({
          title: 'Success',
          description: 'Code sent to your email address',
          variant: 'success',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
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
        {!isSuccessfulCreateion ? (
          <>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification COde</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter code" {...field} />
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          type="submit"
          className="mt-3 bg-green-600 hover:bg-green-500 w-full"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Continue'}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
