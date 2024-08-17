'use client';
import { IFood } from '@/models/food';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import FeaturedPopover from '@/components/admin/foods/featured-popover';
import FoodDropdown from '@/components/admin/foods/food-dropdown';
import { ObjectId } from 'mongoose';

type Props = {
  foods: IFood[];
};

const FoodTable = ({ foods }: Props) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {foods.map((d) => (
            <TableRow key={d.id}>
              <TableCell>
                {d.images ? (
                  <Suspense
                    fallback={
                      <Skeleton className="w-[70] h-[70] rounded-md bg-gray-400" />
                    }
                  >
                    <Image
                      src={d.images[0]}
                      alt="user image"
                      width={70}
                      height={70}
                      className="rounded-md"
                    />
                  </Suspense>
                ) : (
                  <User2 />
                )}
              </TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.price}</TableCell>
              <TableCell>{d.category}</TableCell>
              <TableCell>
                <FeaturedPopover
                  foodId={d._id as string}
                  initialFeatured={d.featured}
                />
              </TableCell>
              <TableCell>
                <FoodDropdown food={d} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FoodTable;
