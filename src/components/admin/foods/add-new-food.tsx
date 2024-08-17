'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { IFood } from '@/models/food';
import { AddNewFoodSchema } from '@/types/schema.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FoodForm from './food-form';

type Props = {
  food?: IFood;
};

const AddNewFood = ({ food }: Props) => {
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex gap-2 bg-primary-button">
          Add new Food
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new food</DialogTitle>
        </DialogHeader>
        <FoodForm food={food} type="new" />
      </DialogContent>
    </Dialog>
  );
};

export default AddNewFood;
