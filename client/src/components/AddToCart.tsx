import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
  Separator,
} from "../interfaces";
import { ShoppingCart } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import CartItem from "./cart/CartItem";
import CartSummary from "./cart/CartSummary";
import { Link } from "react-router-dom";

export default function AddToCart() {
  const { getAllCartProducts, cart }: any = useProduct();
  useEffect(() => {
    getAllCartProducts();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-5">
        <SheetHeader>
          <SheetTitle>Cart Items</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <section className="mt-5 w-full h-[64%] overflow-hidden overflow-y-auto">
          <ul role="list">
            {cart.map((product: any) => (
              <>
                <CartItem data={product} />
                <Separator className="my-4" />
              </>
            ))}
          </ul>
        </section>

        {cart.length > 0 && (
          <section className="w-full">
            <CartSummary className="w-full" data={cart} />
            <div className="mt-4">
              <Link to="/grocery/order">
                <Button className="w-full !py-5 font-bold shadow-sm">
                  Checkout
                </Button>
              </Link>
            </div>
            <div className="mt-3 flex justify-center text-center text-sm text-foreground">
              <p>
                or
                <Link to="/grocery" className="ml-1">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        )}
      </SheetContent>
    </Sheet>
  );
}
