import { useEffect, useState } from "react";
import { Button } from "../../interfaces";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";

const OrderConfirme = () => {
  const [isOrdered, setIsOrdered] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCart } = useProduct();
  const { uid } = useAuth();
  const params = useParams();
  const userInfo = params.info?.split("&") as string[];

  useEffect(() => {
    const clearCart = async () => {
      const details = {
        name: userInfo[0],
        email: userInfo[1],
        phone: userInfo[2],
        address: userInfo[3],
      };
      const { name, email, phone, address } = details;
      try {
        if (!name || !email || !phone || !address) {
          console.log("sonthing went wrong");
        } else {
          if (isOrdered) {
            const response = await axios.post(
              "/api/v1/order/checkout",
              details,
              {
                headers: {
                  Authorization: `Bearer ${uid}`,
                },
              }
            );
            response.status == 201 && setCart([]);
            setIsOrdered(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    userInfo.length > 2 && clearCart();
  }, [params, isOrdered]);
  console.log(isOrdered);

  // location.pathname.includes("success")
  return (
    <>
      <section className="flex flex-col items-center absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <h3 className="text-2xl font-semibold">Order Placed Successfuly</h3>
        <CheckCircle className="w-16 h-16 mt-6 text-green-500" />
        <div className="w-full flex items-center justify-center space-x-2 mt-12">
          <Button onClick={() => navigate("/")}>Go Home</Button>
          <Button variant="outline" onClick={() => navigate("/order-history")}>
            Order History
          </Button>
        </div>
      </section>
    </>
  );
};

export default OrderConfirme;
