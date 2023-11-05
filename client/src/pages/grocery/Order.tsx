import React, { useState, useEffect, ChangeEvent } from "react";
import Nav from "./components/Nav";
import { Input, Button, Label, Separator } from "../../interfaces";
import { useProduct } from "./context/ProductContext";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import { useToast } from "../../interfaces";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [info, setInfo] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const [payDetile, setPayDetile] = useState({
    name: "",
    number: "",
    date: "",
    cvc: "",
  });
  const { getAllCartProducts, cart }: any = useProduct();
  const { toast } = useToast();
  const naviagete = useNavigate();

  useEffect(() => {
    getAllCartProducts();
  }, []);

  const handleInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handlePayDetaile = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayDetile({ ...payDetile, [name]: value });
  };

  const handleOrder = async () => {
    const detaile = Object.values(info).filter((item) => item !== "");
    const pay = Object.values(payDetile).filter((item) => item !== "");

    if (detaile.length < 6 || pay.length < 4) {
      toast({ title: "⚠️ Please fillup all the filds" });
    } else {
      const data = await fetch("/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart, detaile: info, pay: payDetile }),
      });
      const res = await data.json();
      res[0]?._id && toast({ title: "Order placed successfully 🥳" });
      res[0]?._id && naviagete("/grocery");
    }
  };
  return (
    <>
      <Nav />
      <main className="flex items-start justify-center my-16">
        <section className="mr-20 w-[600px]">
          <h2 className="text-2xl font-semibold mb-6">Shipping Informations</h2>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                className="px-4 py-2 w-full"
                value={info.name}
                onChange={handleInfo}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                className="px-4 py-2 w-full"
                value={info.email}
                onChange={handleInfo}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="phone"
                name="phone"
                className="px-4 py-2 w-full"
                value={info.phone}
                onChange={handleInfo}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                name="address"
                className="px-4 py-2 w-full"
                value={info.address}
                onChange={handleInfo}
              />
            </div>

            <div className="flex items-center space-x-2 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="city">City</Label>
                <Input
                  name="city"
                  className="px-4 py-2"
                  value={info.city}
                  onChange={handleInfo}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="city">State</Label>
                <Input
                  name="state"
                  className="px-4 py-2"
                  value={info.state}
                  onChange={handleInfo}
                />
              </div>
            </div>
          </div>
          <Separator className="w-full my-10" />
          <h2 className="text-2xl font-semibold mb-6">Payment details</h2>
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
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.map((product: any) => (
                <CartItem data={product} />
              ))}
            </ul>
          </div>

          <div className="w-[480px]">
            <CartSummary className="w-full" data={cart} />
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
