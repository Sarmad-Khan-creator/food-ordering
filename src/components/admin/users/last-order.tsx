import { getFoodById } from '@/actions/food.action';
import { ObjectId } from 'mongoose';
import Image from 'next/image';
import React from 'react';

type Props = {
  id: ObjectId;
};

const LastOrder = async ({ id }: Props) => {
  const food = await getFoodById(id);
  return (
    <div key={food.id} className="flex gap-2 items-center">
      <Image src={food.images[0]} alt="product image" width={50} height={50} />
      <div className="flex flex-col">
        <p>{food.name}</p>
        <p>Price: ${food.price}</p>
      </div>
    </div>
  );
};

export default LastOrder;
