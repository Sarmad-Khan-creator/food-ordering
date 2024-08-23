import { getFoodById } from '@/actions/food.action';
import { getUserByClerkId } from '@/actions/user.action';
import FoodCard from '@/components/food/food-card';
import { currentUser } from '@clerk/nextjs/server';
import { ObjectId } from 'mongoose';
import React from 'react';

const Wishlist = async () => {
  const clerkUser = await currentUser();
  const user = await getUserByClerkId(clerkUser?.id!);
  return (
    <section className="flex flex-col gap-9 px-10 py-14">
      <p className="text-sm">
        User /<span className="text-gray-500"> Wishlist</span>
      </p>
      <div className="flex items-center gap-5">
          {JSON.parse(user).wishlist.map(async (foodId: ObjectId) => {
            const food = await getFoodById(foodId);
            return (
              <FoodCard
                key={JSON.parse(food)._id}
                food={JSON.parse(food)}
                user={JSON.parse(user)}
                path="/user/wishlist"
              />
            );
          })}
        </div>
    </section>
  );
};

export default Wishlist;
