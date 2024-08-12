import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IUser } from '@/models/user';
import React from 'react';
import EditProfileForm from './edit-profile-form';

type Props = {
  user: IUser;
};

const EditProfile = ({ user }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer flex items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 border-none w-full justify-start h-fit"
          variant="outline"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
        </DialogHeader>
        <EditProfileForm user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
