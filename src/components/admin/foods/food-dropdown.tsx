import { IFood } from '@/models/food';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import ViewFood from './view-food';
import EditFood from './edit-food';
import DeleteFood from './delete-food';

type Props = {
  food: IFood;
};

const FoodDropdown = ({ food }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Food Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ViewFood food={food} />
        <EditFood food={food} />
        <DeleteFood food={food} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FoodDropdown;
