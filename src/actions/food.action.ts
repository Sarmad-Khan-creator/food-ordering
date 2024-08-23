'use server';

import {connectToDatabase} from '@/db/db';
import Food from '@/models/food';
import {FoodProps} from '@/types/types';
import {MongooseError, ObjectId} from 'mongoose';
import {revalidatePath} from 'next/cache';

export const getFoodById = async (id: string) => {
  try {
    await connectToDatabase();
    const food = await Food.findById(id);

    return JSON.stringify(food);
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const createFood = async (data: FoodProps) => {
  try {
    await connectToDatabase();
    const food = await Food.create(data);

    revalidatePath('/admin/foods');
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const updateFood = async (id: string, data: Partial<FoodProps>) => {
  try {
    await connectToDatabase();
    const food = await Food.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          price: data.price,
          discountPercent: data.discountPercent,
          quantity: data.quantity,
          category: data.category,
          images: data.images,
          featured: data.featured,
          description: data.description,
        },
      },
      {new: true}
    );

    revalidatePath('/admin/foods');
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const getAllFood = async () => {
  try {
    await connectToDatabase();
    const foods = await Food.find();

    return JSON.stringify(foods);
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const changeFoodFeatured = async (foodId: string, featured: boolean) => {
  try {
    await connectToDatabase();
    await Food.findByIdAndUpdate(
      foodId,
      {
        $set: {
          featured: featured,
        },
      },
      {
        new: true,
      }
    );

    revalidatePath('/admin/foods');
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const deleteFood = async (foodId: string) => {
  try {
    await connectToDatabase();
    const deletedFood = await Food.findByIdAndDelete(foodId);

    revalidatePath('/admin/foods');

    return deletedFood;
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const getFeaturedFoods = async () => {
  try {
    await connectToDatabase()
    const foods = await Food.find({
      featured: true,
    });

    console.log(foods)

    return foods
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};

export const getFoodRating = async (foodId: string) => {
  try {
    const updatedFood = await Food.aggregate([
      {$match: {_id: foodId}},
      {$project: {_id: 0, rating: 1}},
      {$unwind: '$reviews'},
      {
        $lookup: {
          from: "review", localField: "reviews", foreignField: "_id", as: "reivew"
        }
      }
    ])
  } catch (e) {
    const error = new MongooseError(e as string)
    throw error.message
  }
}