import { useState } from "react";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  Button,
} from "../interfaces";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../context/ProductContext";
import { StarIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";

type ReviewProductProps = {
  productId: string;
};
const ReviewProduct = ({ productId }: ReviewProductProps) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(4);
  const { uid } = useAuth();
  const { setCart } = useProduct();
  const navigate = useNavigate();

  const addProductReview = async () => {
    const data = {
      date: new Date().toDateString(),
      rate: rating,
      productId,
      review,
    };
    try {
      await axios.post(`/api/v1/product/reviews/new-review`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${uid}`,
        },
      });
      setCart([]);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer open={Boolean(productId)} onClose={() => navigate("/")}>
      <DrawerContent className="">
        <div className="mx-auto w-[600px] my-10">
          <DrawerHeader>
            <DrawerTitle>Add Product Review</DrawerTitle>
            <DrawerDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
              sint?
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center mx-4 mb-5">
            <span className="text-normal">Rate:</span>{" "}
            <StarReview rating={rating} setRating={setRating} isFixed={false} />
          </div>
          <textarea
            className="w-[95%] mx-4 rounded-lg bg-background border h-36 p-3"
            placeholder="Share your experience"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          <DrawerFooter>
            <Button onClick={addProductReview} className="w-full">
              Submit
            </Button>
            <DrawerClose className="w-full mt-1">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Cancle
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReviewProduct;

type StarReviewProps = {
  rating: number;
  setRating?: any;
  className?: string;
  isFixed: boolean;
};
export const StarReview = ({
  rating,
  setRating,
  className,
  isFixed,
}: StarReviewProps) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <section className="flex items-center">
      {stars.map((item) => (
        <StarIcon
          className={cn(
            "w-6 h-6 mx-1 cursor-pointer",
            item <= rating ? "text-yellow-600" : "",
            className
          )}
          onClick={() => !isFixed && setRating(item)}
        />
      ))}
    </section>
  );
};
