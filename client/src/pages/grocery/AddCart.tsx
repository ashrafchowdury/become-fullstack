import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { Button } from "../../interfaces";
import { Link } from "react-router-dom";
import { useProduct } from "./context/ProductContext";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

const AddCart = () => {
  const { getAllCartProducts, cart }: any = useProduct();
  useEffect(() => {
    getAllCartProducts();
  }, []);

  return (
    <>
      <Nav />
      {cart.length == 0 ? (
        <h1 className="font-bold text-3xl absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] opacity-30">
          Cart Is Empty
        </h1>
      ) : (
        <h1 className="font-bold text-2xl mt-16 mb-8">Shopping Cart</h1>
      )}

      <section className="flex items-start justify-between mb-20">
        <div className="mt-8 w-[720px]">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart.map((product: any) => (
              <CartItem data={product} />
            ))}
          </ul>
        </div>

        {cart.length > 0 && (
          <div className="w-[400px]">
            <CartSummary className="w-full" data={cart} />
            <div className="mt-6">
              <Link to="/grocery/order">
                <Button className="w-full !py-5 font-bold shadow-sm">Checkout</Button>
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/grocery" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default AddCart;
