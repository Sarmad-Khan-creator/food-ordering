'use server';

import Order from '@/models/order';
import { MongooseError } from 'mongoose';

export const getOrdersValue = async () => {
  try {
    const ordersValue = await Order.aggregate([
      { $match: { status: 'Completed' } },
      { $project: { foods: 1 } },
      {
        $lookup: {
          from: 'foods',
          localField: 'foods',
          foreignField: '_id',
          as: 'foods',
        },
      },
      { $group: { _id: '$price', totalValue: { $sum: 1 } } },
    ]);

    console.log(ordersValue);
  } catch (error) {
    const err = new MongooseError(error as string);
    throw err.message;
  }
};
