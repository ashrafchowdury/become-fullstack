import { useState, useEffect } from "react";
import { Separator } from "../../interfaces";
import { useProduct } from "../../context/ProductContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import UserCredientials from "../../components/UserCredientials";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../interfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import Payment from "../../components/Payment";
// import axios from "axios";

// const stripePromise = loadStripe(process.env.STRIPE_PUBLISH_KEY as string);

const Order = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { currentUser, uid } = useAuth();
  const [details, setDetailse] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone as string,
    address: currentUser.address as string,
  });
  const { cart, setCart } = useProduct();
  const nagivate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "/api/v1/order/create-payment-intent",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${uid}`,
  //           },
  //         }
  //       );
  //       response.status == 200 && setClientSecret(response.data.clientSecret);
  //     } catch (error) {
  //       console.error("Error fetching client secret:", error);
  //     }
  //   };
  //   uid && fetchData();
  // }, [cart, uid]);

  const orderProduct = async () => {
    const { name, email, phone, address } = details;
    try {
      if (!name || !email || !phone || !address) {
        console.log("sonthing went wrong");
      } else {
        await axios.post("/api/v1/order/checkout", details, {
          headers: {
            Authorization: `Bearer ${uid}`,
          },
        });
        setTimeout(() => {
          nagivate(`/?order=succeed?productId=${(cart[0] as any).product._id}`);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
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
          {/* <h2 className="text-2xl font-semibold mb-6 mt-12">Payment</h2>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: clientSecret }}
            >
              <Payment details={details} clientSecret={clientSecret} />
            </Elements>
          )} */}
        </section>

        <section className="flex flex-col items-start justify-between space-y-5 mb-20">
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
          </div>
          <Button className="w-full !mt-10" onClick={orderProduct}>
            Order Product
          </Button>
        </section>
      </main>
    </>
  );
};

export default Order;
