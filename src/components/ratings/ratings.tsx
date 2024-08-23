import {ratingsNumber} from "@/lib/consants";
import {StarFilledIcon, StarIcon} from "@radix-ui/react-icons";

type Props = {
  rating: number,
  className?: string
}

const Ratings = ({rating, className}: Props) => {
  return (
    <div className={className}>
      {ratingsNumber.map((rat) => (
        <>{rat === rating ? <StarFilledIcon/> : <StarIcon/>}</>
      ))}
    </div>
  )
}

export default Ratings