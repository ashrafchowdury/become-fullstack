import { cn } from "../../lib/utils";
import { useProduct } from "../../context/ProductContext";

const CartSummary = ({ className }: { className?: string }) => {
  const { cart } = useProduct();
  const productAmount = () => {
    return cart.reduce(
      (total: any, item: any) =>
        total + Number(item?.product?.price?.substring(1)) * item?.quantity,
      0
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm font-medium border-b py-[10px]">
        <p>Subtotal</p>
        <p>${productAmount()}.00</p>
      </div>
      <div className="flex justify-between text-sm font-medium border-b py-[10px]">
        <p>Shipping</p>
        <p>$5.00</p>
      </div>
      <div className="flex justify-between text-base font-bold border-b py-[10px]">
        <p>Total</p>
        <p>${productAmount() + 8}.00</p>
      </div>
      <p className="mt-0.5 text-sm text-foreground">
        Shipping and taxes calculated at checkout.
      </p>
    </div>
  );
};

export default CartSummary;
