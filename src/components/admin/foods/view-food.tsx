'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import React, { useState } from 'react';
import { IFood } from '@/models/food';

type Props = {
  food: IFood;
};

const ViewFood = ({ food }: Props) => {
  //   const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer flex items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 border-none w-full justify-start h-fit"
          variant="outline"
        >
          Food Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{food.name} Detail</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8">
          {food.images && (
            <>
              <div className="w-full h-[170px] relative">
                <Image
                  key={food.images[1]}
                  src={food.images[1]}
                  alt="food image"
                  fill
                />
              </div>
              <div className="flex gap-5">
                <Image
                  key={food.images[0]}
                  src={food.images[0]}
                  alt="food image"
                  width={130}
                  height={130}
                  className="rounded-md -mt-[80px] ml-3 relative z-10"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{food.name}</h2>
                  <p className="text-sm"><span className="font-semibold">Category:</span> {food.category}</p>
                </div>
              </div>
            </>
          )}
          <div className="flex flex-col gap-3">
            <p>Featured: {food.featured ? 'Yes' : 'No'}</p>
            <p>Price: Rs. {food.price}</p>
            <p>Quantity: {food.quantity}</p>
            <h3 className="text-lg font-semibold">Description: </h3>
            <p className="rounded-md bg-black/10 block p-2">
              {food.description}
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewFood;
