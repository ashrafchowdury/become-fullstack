import { cn } from "../../lib/utils";

const CartSummary = ({
  className,
  data,
}: {
  className?: string;
  data: any;
}) => {
  const productAmount = () => {
    return data.reduce(
      (total: any, product: any) =>
        total + Number(product?.price?.substring(1)) * product?.quantity,
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
