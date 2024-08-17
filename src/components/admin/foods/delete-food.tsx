import { deleteFood } from '@/actions/food.action';
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
import { toast } from '@/components/ui/use-toast';
import { IFood } from '@/models/food';

type Props = {
  food: IFood
};

const DeleteFood = ({ food }: Props) => {
  const handleDeleteFood = async () => {
    try {
      await deleteFood(food._id as string)
      toast({
        title: 'Food deleted',
        description: 'Food has been deleted successfully.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error deleting Food',
        description: error as string,
        variant: 'destructive',
      });
    }
  };
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
            Your are going to delete {food.name} account. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 text-white hover:bg-red-500"
            onClick={async () => await handleDeleteFood()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFood;
