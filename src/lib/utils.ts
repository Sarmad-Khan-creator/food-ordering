import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getDiscountedPrice = (discountPercent: number, price: number): number => {
    const foodPrice = (price - (discountPercent * price) / 100).toFixed(2)
    return Number(foodPrice)
}
