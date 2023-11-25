import React, { useState, ChangeEvent } from "react";
import { Input, Button, Label, Separator, useToast } from "../../interfaces";
import { useProduct } from "../../context/ProductContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import { useNavigate } from "react-router-dom";
import UserCredientials from "../../components/UserCredientials";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Order = () => {
  const { uid, currentUser } = useAuth();
  const [payDetile, setPayDetile] = useState({
    name: "",
    number: "",
    date: "",
    cvc: "",
  });
  const [details, setDetailse] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone as string,
    address: currentUser.address as string,
  });

  const { cart, setCart } = useProduct();
  const { toast } = useToast();

  const naviagete = useNavigate();

  const handlePayDetaile = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayDetile({ ...payDetile, [name]: value });
  };

  const handleOrder = async () => {
    const pay = Object.values(payDetile).filter((item) => item !== "");
    try {
      if (pay.length < 4 || !details.address || !details.phone) {
        toast({ title: "⚠️ Please fillup all the filds" });
      } else {
        const data = { payment: payDetile, details };
        const response = await axios.post(
          "/api/v1/products/order-product",
          data,
          {
            headers: {
              Authorization: `Bearer ${uid}`,
            },
          }
        );
        if (response.status == 201) {
          toast({ title: "Order placed successfully 🥳" });
          setTimeout(() => {
            setCart([]);
            naviagete("/");
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong. Try again",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <main className="flex items-start justify-center my-16">
        <section className="mr-20 w-[600px]">
          <h2 className="text-2xl font-semibold mb-6">User Information</h2>
          <UserCredientials
            isDisabled={false}
            state={details}
            setState={setDetailse}
          />
          <h2 className="text-2xl font-semibold mb-6 mt-10">Payment details</h2>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="card">Name on card</Label>
              <Input
                name="name"
                className="px-4 py-2 w-full"
                value={payDetile.name}
                onChange={handlePayDetaile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Card number</Label>
              <Input
                type="number"
                name="number"
                className="px-4 py-2 w-full"
                value={payDetile.number}
                onChange={handlePayDetaile}
              />
            </div>
          </div>
          <div className="flex items-center justify-between space-x-2 mt-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="date">Expiration date (MM/YY)</Label>
              <Input
                type="date"
                name="date"
                className="px-4 py-2 w-full"
                value={payDetile.date}
                onChange={handlePayDetaile}
              />
            </div>
            <div className="space-y-2 w-[50%]">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                type="number"
                name="cvc"
                className="px-4 py-2 w-full"
                value={payDetile.cvc}
                onChange={handlePayDetaile}
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col items-start justify-between space-y-8 mb-20">
          <div className="mt-8 w-[480px]">
            {cart.map((item: any) => (
              <>
                <CartItem item={item} />
                <Separator className="my-4" />
              </>
            ))}
          </div>

          <div className="w-[480px]">
            <CartSummary className="w-full" />
            <div className="mt-6">
              <Button
                className="w-full !py-5 font-bold shadow-sm"
                onClick={handleOrder}
              >
                Order
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Order;
