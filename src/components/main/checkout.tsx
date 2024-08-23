"use client"
import {IUser} from "@/models/user";
import {addFoodToCart, addFoodToWishlist, removeFoodFromCart, removeFoodFromWishlist} from "@/actions/user.action";
import {toast} from "@/components/ui/use-toast";
import {Button} from "@/components/ui/button";
import {HeartFilledIcon} from "@radix-ui/react-icons";
import {ShoppingCart} from "lucide-react";
import Link from "next/link";
import React from "react";
import {ObjectId} from "mongoose";

type Props = {
  user: Partial<IUser>
  foodId: string
}
const Checkout = ({user, foodId}: Props) => {
  const addToWishlist = async () => {
    try {
      await addFoodToWishlist(foodId, `/foods/${foodId}`);
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
      await removeFoodFromWishlist(foodId, `/foods/${foodId}`);
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
      await addFoodToCart(foodId, `/foods/${foodId}`);
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
      await removeFoodFromCart(foodId, `/foods/${foodId}`);
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
    <div className={"flex gap-2 h-[50px] w-full"}>
      <Button className={"w-[50px] h-full rounded-md p-1"} variant={"outline"} onClick={
        user.wishlist?.includes(foodId as unknown as ObjectId)
          ? () => removeFromWishlist()
          : () => addToWishlist()
      }>
        <HeartFilledIcon
          className={`w-[30px] h-[30px] ${user.wishlist?.includes(foodId as unknown as ObjectId) && "text-red-500"}`}/>
      </Button>
      <Button className={"w-[50px] h-full rounded-md p-1"} variant={"outline"} onClick={
        user.cart?.includes(foodId as unknown as ObjectId)
          ? () => removeFromCart()
          : () => addToCart()
      }>
        <ShoppingCart className={`${user.cart?.includes(foodId as unknown as ObjectId) && "text-yellow-500"}`}/>
      </Button>
      <Link href={"#"}
            className={"flex-1 h-full rounded-md border border-gray-300 flex items-center justify-center"}>
        <p>Proceed to checkout</p>
      </Link>
    </div>
  )
}

export default Checkout