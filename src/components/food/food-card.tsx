'use client';

import { IFood } from '@/models/food';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import {
  addFoodToCart,
  addFoodToWishlist,
  removeFoodFromCart,
  removeFoodFromWishlist,
} from '@/actions/user.action';
import { toast } from '../ui/use-toast';
import { IUser } from '@/models/user';
import { ObjectId } from 'mongoose';
import Link from 'next/link';

type Props = {
  food: Partial<IFood>;
  user: Partial<IUser>;
  path: string
};

const FoodCard = ({ food, user, path }: Props) => {
  const addToWishlist = async () => {
    try {
      await addFoodToWishlist(food._id as string, path);
      toast({
        title: 'Success',
        description: 'Food added to wishlist successfully',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error as string,
        variant: 'destructive',
      });
    }
  };

  const removeFromWishlist = async () => {
    try {
      await removeFoodFromWishlist(food._id as string, path);
      toast({
        title: 'Success',
        description: 'Food removed from wishlist successfully',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error as string,
        variant: 'destructive',
      });
    }
  };

  const addToCart = async () => {
    try {
      await addFoodToCart(food._id as string, path);
      toast({
        title: 'Success',
        description: 'Food added to cart successfully',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error as string,
        variant: 'destructive',
      });
    }
  };

  const removeFromCart = async () => {
    try {
      await removeFoodFromCart(food._id as string, path);
      toast({
        title: 'Success',
        description: 'Food removed from cart successfully',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error as string,
        variant: 'destructive',
      });
    }
  };
  return (
    <div className="flex flex-col gap-3 w-[230px] rounded-md shadow-md p-5">
      <div
        className={`flex items-center ${
          food.discountPercent! > 0 ? 'justify-between' : 'justify-end'
        }`}
      >
        <div
          className={`${
            food.discountPercent === 0 ? 'hidden' : 'block'
          } py-1 px-3 bg-green-400 text-white text-xs rounded-sm`}
        >
          -{food.discountPercent}%
        </div>
        <div className="flex gap-3">
          <Button
            className={`rounded-full p-1 h-8 w-8 bg-gray-300 hover:bg-gray-400 ${
              user?.wishlist?.includes(food._id as ObjectId) && 'text-red-500'
            }`}
            onClick={
              user.wishlist?.includes(food._id as ObjectId)
                ? () => removeFromWishlist()
                : () => addToWishlist()
            }
          >
            <Heart />
          </Button>
          <Button
            className={`rounded-full p-0 h-8 w-8 bg-gray-300 hover:bg-gray-400 ${
              user?.cart?.includes(food._id as ObjectId) && 'text-yellow-500'
            }`}
            onClick={
              user.cart?.includes(food._id as ObjectId)
                ? () => removeFromCart()
                : () => addToCart()
            }
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
      <Link href={`/foods/${food._id}`}>
        <div className="relative w-full h-[130px]">
          <Image src={food.images?.[0] ?? ''} alt="food image" fill />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{food.name}</h3>
          <div className="flex gap-2">
            <p
              className={`text-sm ${
                food.discountPercent! > 0 && 'line-through text-red-500'
              }`}
            >
              Rs. {food.price}
            </p>
            {food.discountPercent! > 0 && (
              <p className="text-sm">
                Rs. {food.price! - (food.discountPercent! * food.price!) / 100}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FoodCard;
