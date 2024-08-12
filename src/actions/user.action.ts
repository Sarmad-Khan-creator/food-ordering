'use server';

import { MongooseError } from 'mongoose';
import { connectToDatabase } from '../db/db';
import { CreateUserProps, UpdateUserProps } from '../types/types';
import User from '../models/user';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

export const createUser = async (user: CreateUserProps) => {
  try {
    await connectToDatabase();

    await User.create(user);
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const updateUser = async (
  clerkId: string,
  updateUserData: UpdateUserProps,
  path: string
) => {
  const { name, address, username, phoneNumber } = updateUserData;
  try {
    await connectToDatabase();

    await clerkClient.users.updateUser(clerkId, {
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      username: username,
    });

    const user = await User.findOneAndUpdate(
      {
        clerkId,
      },
      {
        $set: {
          name,
          address,
          username,
          phoneNumber,
        },
      },
      { new: true }
    );

    revalidatePath(path);
    return user;
  } catch (err) {
    const error = new MongooseError(err as string);
    throw error.message;
  }
};

export const deleteUser = async (clerkId: string, path?: string) => {
  try {
    await connectToDatabase();
    await User.deleteOne({ clerkId });

    revalidatePath("/admin/users")
    return redirect(path!);
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId });
    return user;
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const getAllUsers = async () => {
  try {
    await connectToDatabase();
    const users = await User.find();

    return users;
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const changeUserRole = async (clerkId: string, role: string) => {
  try {
    connectToDatabase();
    await User.findOneAndUpdate(
      {
        clerkId,
      },
      {
        role,
      }
    );

    revalidatePath('/admin/users');
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};
