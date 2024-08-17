import AddNewFood from '@/components/admin/foods/add-new-food';
import Search from '@/components/search/search';
import React from 'react';
import FoodTable from './food-table';
import { getAllFood } from '@/actions/food.action';

const Foods = async () => {
  const foods = await getAllFood();
  return (
    <section className="w-full flex-1 overflow-y-auto px-5 py-6">
      <h1 className="text-3xl font-semibold mb-3">All Foods</h1>
      <div className="flex justify-between items-center">
        <Search placeholder="foods" />
        <AddNewFood />
      </div>
      <div className="mt-5">
        <FoodTable foods={JSON.parse(foods)} />
      </div>
    </section>
  );
};

export default Foods;
