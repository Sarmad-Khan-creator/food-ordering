import {getFoodById} from '@/actions/food.action';
import {getUserByClerkId} from '@/actions/user.action';
import CartFood from '@/components/main/cart-food';
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
} from '@/components/ui/table';
import {currentUser} from '@clerk/nextjs/server';
import {ObjectId} from 'mongoose';
import React from 'react';
import {cartTitles} from "@/lib/consants";
import CartTotalPrice from "@/components/main/cart-total-price";

const Cart = async () => {
    const clerkUser = await currentUser();
    const user = await getUserByClerkId(clerkUser?.id!);
    return (
        <section className="flex flex-col gap-9 px-10 py-14">
            <p className="text-sm">
                User / <span className="text-gray-500">Cart</span>
            </p>
            <div className="flex flex-col gap-5">
                <div className="flex">
                    {cartTitles.map((title) => (
                        <p className="flex-1 font-semibold" key={title}>{title}</p>
                    ))}
                </div>
                {JSON.parse(user).cart.map(async (foodId: ObjectId) => {
                    const food = await getFoodById(foodId);

                    return (
                        <CartFood key={JSON.parse(user)._id} food={JSON.parse(food)}/>
                    );
                })}
            </div>
            <div className={"mt-8 w-full flex justify-end"}>
                <CartTotalPrice price={450}/>
            </div>
        </section>
    );
};

export default Cart;
