import { cn } from "../../../lib/utils";

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
    <div className={cn("w-[400px]", className)}>
      <div className="flex justify-between text-base font-medium text-gray-900 border-b py-3">
        <p>Subtotal</p>
        <p>${productAmount()}.00</p>
      </div>
      <div className="flex justify-between text-base font-medium text-gray-900 border-b py-3">
        <p>Shipping</p>
        <p>$5.00</p>
      </div>
      <div className="flex justify-between text-base font-medium text-gray-900 border-b py-3">
        <p>Tax</p>
        <p>$8.00</p>
      </div>
      <div className="flex justify-between text-lg font-bold text-gray-900 border-b py-3">
        <p>Total</p>
        <p>${productAmount() + 5 + 8}.00</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
    </div>
  );
};

export default CartSummary;
