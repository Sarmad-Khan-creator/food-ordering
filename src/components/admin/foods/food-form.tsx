'use client';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { categories, featured } from '@/lib/consants';
import { AddNewFoodSchema } from '@/types/schema.types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { IFood } from '@/models/food';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import UploadFoodImage from './upload-food-image';
import Image from 'next/image';
import { createFood, updateFood } from '@/actions/food.action';
import { toast } from '@/components/ui/use-toast';

type Props = {
  food?: IFood;
  type: string;
};

const FoodForm = ({ food, type }: Props) => {
  const [foodImages, setFoodImages] = useState<string[]>(food?.images || []);
  const form = useForm<z.infer<typeof AddNewFoodSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(AddNewFoodSchema),
    defaultValues: {
      name: food?.name || '',
      price: String(food?.price) || '',
      discountPercent: String(food?.discountPercent) || '',
      description: food?.description || '',
      category: food?.category || '',
      images: food?.images || [],
      quantity: String(food?.quantity) || '',
      featured: food?.featured || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof AddNewFoodSchema>) => {
    try {
      if (type === 'new') {
        await createFood({
          name: values.name,
          price: Number(values.price),
          discountPercent: Number(values.discountPercent),
          quantity: Number(values.quantity),
          description: values.description,
          category: values.category,
          featured: values.featured,
          images: foodImages,
        });

        toast({
          title: 'Success',
          description: 'Food created successfully!',
          variant: 'success',
        });
      } else if (type === 'edit') {
        await updateFood(food?._id as string, {
          name: values.name,
          price: Number(values.price),
          discountPercent: Number(values.discountPercent),
          quantity: Number(values.quantity),
          description: values.description,
          category: values.category,
          featured: values.featured,
          images: foodImages,
        });

        toast({
          title: 'Success',
          description: 'Food updated successfully!',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: error as string,
        variant: 'destructive',
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name of food" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price of food" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="discountPercent"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Discounted Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Discounted price of food"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Quantity of food"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Select Category</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="w-full">
                      <Button variant="secondary" className="justify-start">
                        {field.value
                          ? field.value.toUpperCase()
                          : 'Select Category'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[230px]">
                      {categories.map((category) => (
                        <DropdownMenuItem
                          key={category.value}
                          onSelect={() =>
                            form.setValue('category', category.value)
                          }
                        >
                          {category.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <UploadFoodImage setImages={setFoodImages} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="featured"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Featured</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="w-full">
                      <Button variant="secondary" className="justify-start">
                        {field.value === true ? 'Yes' : 'No'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[230px]">
                      {featured.map((f) => (
                        <DropdownMenuItem
                          key={f.title}
                          onSelect={() => form.setValue('featured', f.value)}
                        >
                          {f.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {foodImages.length > 0 && (
          <div className="flex gap-1 mt-2">
            {foodImages.map((food) => (
              <Image
                src={food}
                key={food}
                alt="food image"
                width={80}
                height={80}
              />
            ))}
          </div>
        )}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="describe food in detail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-5 flex gap-3">
          <DialogClose>Cancel</DialogClose>
          <Button
            type="submit"
            className="bg-green-700 hover:bg-green-500 text-white w-[100px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : type === 'new' ? (
              'Create'
            ) : (
              'Edit'
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FoodForm;
