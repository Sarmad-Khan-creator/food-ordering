import {IFood} from "@/models/food";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";

type Props = {
    price: number
}

const CartTotalPrice = async ({price}: Props) => {
    return <div className={"w-[300px] flex flex-col gap-2 border border-gray-400 rounded-md py-5 px-3"}>
        <p className={"text-lg font-semibold"}>Cart Total Value</p>
        <Separator/>
        <div className={"flex justify-between"}>
            <p className={"font-semibold text-sm"}>Price</p>
            <p className={"text-sm"}>Rs. {price}</p>
        </div>
        <Button className={"bg-green-500 text-white hover:bg-green-700 rounded-md w-full mt-8"}>Proceed to Checkout</Button>
    </div>
}

export default CartTotalPrice