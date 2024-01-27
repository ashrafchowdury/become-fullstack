import { useProduct, ProductType } from "../../context/ProductContext";
import { cn } from "../../lib/utils";
import { useLocation } from "react-router-dom";

const CartItem = ({
  className,
  item,
}: {
  className?: string;
  item: { product: ProductType; quantity: number };
}) => {
  const { deleteCartProduct } = useProduct();
  const location = useLocation();

  return (
    <div key={item.product._id} className={cn("flex", className)}>
      <div className="h-16 w-18 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.product.image}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-3 flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">{item.product.name}</h3>
          <p className="ml-4">{item.product.price}</p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item.quantity}</p>
          {!location.pathname.includes("order") && (
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => deleteCartProduct(item.product._id as string)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
