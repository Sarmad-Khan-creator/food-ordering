import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IUser } from '@/models/user';
import React from 'react';
import FoodForm from './food-form';
import { IFood } from '@/models/food';

type Props = {
  food: IFood
};

const EditFood = ({ food }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer flex items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 border-none w-full justify-start h-fit"
          variant="outline"
        >
          Edit Food
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
        </DialogHeader>
        <FoodForm type='edit' food={food} />
      </DialogContent>
    </Dialog>
  );
};

export default EditFood;
