'use server';

import { MongooseError } from 'mongoose';
import { connectToDatabase } from '../db/db';
import { CreateUserProps, UpdateUserProps } from '../types/types';
import User from '../models/user';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
  updateUserData: UpdateUserProps
) => {
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: updateUserData },
      { new: true }
    );

    revalidatePath('/user/profile');
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
