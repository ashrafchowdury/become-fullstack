import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Order from "./components/Order";
import { Link } from "react-router-dom";
import { useProduct } from "./context/ProductContext";

const AddCart = () => {
  const { getAllCartProducts, deleteCartProduct, cart }: any = useProduct();
  useEffect(() => {
    getAllCartProducts();
  }, []);

  const productAmount = () => {
    return cart.reduce(
      (total: any, product: any) =>
        total + Number(product?.price?.substring(1)) * product?.quantity,
      0
    );
  };

  return (
    <>
      <Nav />
      <h1 className="font-bold text-2xl mt-16 mb-8">Shopping Cart</h1>

      <section className="flex items-start justify-between mb-20">
        <div className="mt-8 w-[720px]">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart.map((product: any) => (
              <li key={product._id} className="flex py-6">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="text-xl">
                        <a href={product._id}>{product.name}</a>
                      </h3>
                      <p className="ml-4">{product.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.quantity}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => deleteCartProduct(product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[400px]">
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
          <div className="mt-6">
            <Order />

          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link
                to="/grocery"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCart;
