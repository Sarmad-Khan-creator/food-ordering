'use client';
import { getFoodById } from '@/actions/food.action';
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
import { cn } from '@/lib/utils';
import { IUser } from '@/models/user';
import { Mail, User2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import LastOrder from './last-order';

type Props = {
  user: IUser;
};

const ViewUser = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer flex items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 border-none w-full justify-start h-fit"
          variant="outline"
        >
          Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user.name} Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex gap-5 items-center">
            {user.image ? (
              <Image
                src={user.image}
                alt="user image"
                width={150}
                height={150}
                className="rounded-full"
              />
            ) : (
              <User2 size={150} className="rounded-full" />
            )}
            <div className="flex flex-col">
              <div className="flex gap-1">
                <User2 />
                <h2 className="text-lg font-semibold">{user.name}</h2>
              </div>
              <div className="flex gap-1">
                <Image
                  src="/assets/icons/id-card.png"
                  alt="username icon"
                  width={25}
                  height={20}
                />
                <p>{user.username ? user.name : '--------'}</p>
              </div>
              <div className="flex gap-1">
                <Mail />
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <h3 className="font-semibold mt-8">Address:</h3>

          <div className={cn('ml-10', !user.address && 'text-sm')}>
            {user.address ? (
              <p>
                {user.address.addressLine1} {user.address.city},{' '}
                {user.address.state}, {user.address.country},{' '}
                {user.address.zipCode}
              </p>
            ) : (
              'No Address for the current user'
            )}
          </div>
          <div className="mt-8 flex flex-col">
            <h3 className="font-semibold">Cart: ({user.cart.length})</h3>
            {user.cart.length
              ? user.cart.map(async (c) => {
                  const food = await getFoodById(c);
                  return (
                    <div key={food.id} className="flex gap-2 items-center">
                      <Image
                        src={food.images[0]}
                        alt="product image"
                        width={50}
                        height={50}
                      />
                      <div className="flex flex-col">
                        <p>{food.name}</p>
                        <p>Price: ${food.price}</p>
                      </div>
                    </div>
                  );
                })
              : 'No Food in Cart'}
          </div>
          <div className="mt-8 flex flex-col">
            <h3 className="font-semibold">
              Wishlist: ({user.wishlist.length})
            </h3>
            {user.wishlist.length
              ? user.wishlist.map(async (w) => {
                  const food = await getFoodById(w);
                  return (
                    <div key={food.id} className="flex gap-2 items-center">
                      <Image
                        src={food.images[0]}
                        alt="product image"
                        width={50}
                        height={50}
                      />
                      <div className="flex flex-col">
                        <p>{food.name}</p>
                        <p>Price: ${food.price}</p>
                      </div>
                    </div>
                  );
                })
              : 'No Food in Wishlist'}
          </div>
          <div className="mt-8 flex flex-col">
            <h3 className="font-semibold">Orders: ({user.orders.length})</h3>
            {user.orders.length ? (
              <LastOrder id={user.orders[0]} />
            ) : (
              'No Orders yet'
            )}
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

export default ViewUser;
