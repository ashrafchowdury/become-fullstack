import { useProduct } from "../../context/ProductContext";
import { cn } from "../../lib/utils";

const CartItem = ({ className, data }: { className?: string; data: any }) => {
  const { deleteCartProduct }: any = useProduct();

  return (
    <div key={data._id} className={cn("flex", className)}>
      <div className="h-16 w-18 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={data.imageSrc}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-3 flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">{data.name}</h3>
          <p className="ml-4">{data.price}</p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {data.quantity}</p>

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
  );
};

export default CartItem;
