import React from 'react';
import {getFoodById} from "@/actions/food.action";
import {GoBack} from "@/components/main/go-back";
import Image from "next/image";
import {getDiscountedPrice} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {HeartFilledIcon} from "@radix-ui/react-icons";
import {ShoppingCart} from "lucide-react";
import Link from "next/link";
import {currentUser} from "@clerk/nextjs/server";
import {getUserByClerkId} from "@/actions/user.action";
import Checkout from "@/components/main/checkout";

type Props = {
  params: { foodId: string };
};

const FoodDetail = async ({params}: Props) => {
  const clerkUser = await currentUser();
  const user = await getUserByClerkId(clerkUser?.id!);

  const food = await getFoodById(params.foodId)
  return <section className={"flex flex-col items-start gap-5 px-10 py-10 w-full"}>
    <GoBack/>
    <div className={"flex justify-between px-14 w-full"}>
      <div className={"flex gap-16"}>
        <div className={"flex flex-col gap-5"}>
          {JSON.parse(food).images.map((image: string) => (
            <Image key={image} src={image} alt={"food image"} width={130} height={130}
                   className="rounded-md"/>
          ))}
        </div>
        <div className={"relative w-[400px] h-[450px]"}>
          <Image src={JSON.parse(food).images[0]} alt={"food image"} fill className={"rounded-md"}/>
        </div>
      </div>
      <div className={"w-[400px] flex flex-col gap-5 items-start"}>
        <h2 className={"font-semibold text-xl"}>{JSON.parse(food).name}</h2>
        <p className={"text-sm text-gray-600"}>{JSON.parse(food).description}</p>
        <div className={"flex gap-5"}>
          <p
            className={`text-lg ${JSON.parse(food).discountPercent > 0 && "text-red-500 line-through"}`}>Rs. {JSON.parse(food).price}</p>
          {JSON.parse(food).discountPercent > 0 &&
            <p
              className={"text-lg"}>Rs. {getDiscountedPrice(JSON.parse(food).discountPercent, JSON.parse(food).price)}</p>}
        </div>
        <Checkout user={JSON.parse(user)} foodId={params.foodId}/>
      </div>
    </div>
  </section>;
};

export default FoodDetail;
