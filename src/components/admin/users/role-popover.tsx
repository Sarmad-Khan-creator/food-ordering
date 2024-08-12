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
import { roles } from '@/lib/consants';
import { cn } from '@/lib/utils';
import { IUser } from '@/models/user';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  user: IUser;
};

const RolePopover = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(user.role);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-[130px] justify-between"
        >
          {value ? roles.find((val) => val === value) : 'Select Role'}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role}
                  value={role}
                  onSelect={async (currentValue) => {
                    setValue((prevValue) => (prevValue = currentValue));
                    if (value === '') {
                      toast({
                        title: 'Declined',
                        description: 'Please select a role',
                        variant: 'destructive',
                      });
                    } else {
                      
                        await changeUserRole(user.clerkId, currentValue);
                        toast({
                          title: 'Success',
                          description: 'Role updated successfully',
                          variant: 'success',
                        });
                      
                    }
                    setIsOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === role ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {role}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RolePopover;
