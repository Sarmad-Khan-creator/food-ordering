import { ObjectId } from 'mongoose';
import { changeUserRole } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { featured, roles } from '@/lib/consants';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';
import { changeFoodFeatured } from '@/actions/food.action';

type Props = {
  foodId: string;
  initialFeatured: boolean;
};

const FeaturedPopover = ({ foodId, initialFeatured }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<boolean>(initialFeatured);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[130px] justify-between"
        >
          {value ? 'Yes' : 'No'}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {featured.map((f) => (
                <CommandItem
                  key={f.title}
                  value={f.title}
                  onSelect={async () => {
                    setValue((prev) => (prev = f.value));

                    await changeFoodFeatured(foodId, f.value);
                    toast({
                      title: 'Success',
                      description: 'Food featured update successfully',
                      variant: 'success',
                    });

                    setIsOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      f.value === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {f.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FeaturedPopover;
