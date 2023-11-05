import { useProduct } from "../context/ProductContext";
import { cn } from "../../../lib/utils";

const CartItem = ({ className, data }: { className?: string; data: any }) => {
  const { deleteCartProduct }: any = useProduct();

  return (
    <div key={data._id} className={cn("flex py-6", className)}>
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img src={data.imageSrc} className="h-full w-full object-cover object-center" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="text-xl">{data.name}</h3>
            <p className="ml-4">{data.price}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {data.quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => deleteCartProduct(data._id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
