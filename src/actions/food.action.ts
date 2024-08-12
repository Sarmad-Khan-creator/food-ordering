'use server';

import { connectToDatabase } from '@/db/db';
import Food from '@/models/food';
import { MongooseError, ObjectId } from 'mongoose';

export const getFoodById = async (id: ObjectId) => {
  try {
    await connectToDatabase();
    const food = await Food.findById(id);

    return food;
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};
