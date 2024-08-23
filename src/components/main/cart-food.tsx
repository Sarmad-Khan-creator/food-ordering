import {IFood} from '@/models/food';
import Image from 'next/image';
import React from 'react';
import {TableRow, TableCell} from '../ui/table';
import {getDiscountedPrice} from "@/lib/utils";

type Props = {
    food: Partial<IFood>;
};

const CartFood = ({food}: Props) => {
    return (
        <div className="flex items-center">
            <div className="flex-1">
                <Image
                    src={food.images?.[0]!}
                    alt="food image"
                    width={100}
                    height={100}
                    className="rounded-md"
                />
            </div>
            <p className="flex-1 text-sm">{food.name}</p>
            <p className="text-sm flex-1">{food.category}</p>
            <div className="flex-1 flex gap-2">
                <p className={`text-sm ${food.discountPercent! > 0 && "text-red-500 line-through"}`}>Rs. {food.price}</p>
                {food.discountPercent! > 0
                    && <p className="text-sm">Rs. {getDiscountedPrice(food.discountPercent!, food.price!)}</p>}
            </div>
        </div>
    )
};

export default CartFood;
