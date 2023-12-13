import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useToast, Button } from "../interfaces";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

type DetaileType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};
const Payment = ({
  details,
  clientSecret,
}: {
  details: DetaileType;
  clientSecret: string;
}) => {
  const { toast } = useToast();
  const stripe: any = useStripe();
  const elements: any = useElements();
  const { uid } = useAuth();
  const { setCart } = useProduct();
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      if (!details.address || !details.phone) {
        toast({ title: "⚠️ Please fillup all the filds" });
      } else {
        if (!stripe || !elements) {
          return;
        }
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `http://localhost:3000//order-confirme/${details.name}&${details.email}&${details.phone}&${details.address}`,
          },
        });

        if (error) {
          toast({ title: "Something went wrong!", variant: "destructive" });
        }
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong!", variant: "destructive" });
    }
  };
  return (
    <>
      <PaymentElement />
      <Button
        className="w-full !py-5 font-bold shadow-sm mt-10"
        onClick={handleOrder}
        disabled={!stripe}
      >
        Check Out
      </Button>
    </>
  );
};

export default Payment;
