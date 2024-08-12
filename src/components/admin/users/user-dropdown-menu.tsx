import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import ViewUser from './view-user';
import { IUser } from '@/models/user';
import EditProfile from './edit-profile';
import DeleteUser from './delete-user';

type Props = {
  user: IUser;
};

const UserDropdownMenu = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>User Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ViewUser user={user} />
        <EditProfile user={user} />
        <DeleteUser user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
