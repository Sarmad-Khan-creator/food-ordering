import { getFeaturedFoods } from '@/actions/food.action';
import { getUserByClerkId } from '@/actions/user.action';
import FoodCard from '@/components/food/food-card';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

export default async function Home() {
  const clerkUser = await currentUser();
  const foods = await getFeaturedFoods();
  const user = await getUserByClerkId(clerkUser?.id!);
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="relative w-full min-h-[500px]">
          <Image src="/assets/images/hero-image.jpg" alt="hero image" fill />
          <div className="absolute w-full h-full flex flex-col items-center justify-center z-10 bg-white/20">
            <h2 className="text-3xl font-semibold">Welcome to Foodiepy</h2>
            <p className="text-lg">No one can beats over burger and pizza</p>
          </div>
        </div>
      </div>
      <div className="px-10 flex gap-5">
        <section className="w-full flex flex-col items-start gap-10 my-16">
          <h2 className="text-xl font-semibold text-center w-full">
            Featured Products
          </h2>
          <div className="flex gap-4">
            {foods.map((food) => (
              <FoodCard
                food={food}
                key={food._id}
                user={JSON.parse(user)}
                path="/"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
