'use client';
import { updateUser } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { IUser } from '@/models/user';
import { EditProfileFormSchema } from '@/types/schema.types';
import { useAuth } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { MongooseError } from 'mongoose';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  user: IUser;
};

const EditProfileForm = ({ user }: Props) => {
  const { userId } = useAuth();
  const form = useForm<z.infer<typeof EditProfileFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1],
      username: user.username,
      email: user.email,
      address: {
        addressLine1: user.address?.addressLine1,
        city: user.address?.city,
        state: user.address?.state,
        country: user.address?.country,
        zipCode: user.address?.zipCode,
      },
      phoneNumber: user.phoneNumber,
    },
  });

  const onSubmit = async (values: z.infer<typeof EditProfileFormSchema>) => {
    try {
      await updateUser(
        userId!,
        {
          name: `${values.firstName} ${values.lastName}`,
          username: values.username,
          address: values.address,
          phoneNumber: values.phoneNumber,
        },
        '/admin/users'
      );

      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
        variant: 'success',
      });
    } catch (error) {
      //   const err = new MongooseError(error as string);
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-3">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="first name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="last name" type="text" {...field} />
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
            <FormItem className="flex-1">
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="user name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  type="text"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="address.addressLine1"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="address line 1" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <FormField
            name="address.city"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="address.state"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          <FormField
            name="address.country"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="address.zipCode"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="Zip code" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-5 flex gap-3">
          <DialogClose>Close</DialogClose>
          <Button
            type="submit"
            className="bg-green-700 hover:bg-green-500 text-white w-[100px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Continue'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditProfileForm;
