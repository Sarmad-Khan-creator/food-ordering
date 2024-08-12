import { deleteUser } from '@/actions/user.action';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { IUser } from '@/models/user';

type Props = {
  user: IUser;
};

const DeleteUser = ({ user }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="cursor-pointer flex items-center rounded-sm py-2 px-2 text-sm outline-none bg-red-700 text-white hover:bg-red-500 hover:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 border-none w-full justify-start h-fit"
          variant="outline"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your are going to delete {user.name} account. This action cannot be
            undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 text-white hover:bg-red-500"
            onClick={async () => await deleteUser(user.clerkId, '/admin/users')}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUser;
