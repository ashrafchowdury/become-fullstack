import React, { useState } from "react";
import Product from "../components/Product";
import { useProduct } from "../context/ProductContext";
import { useLocation } from "react-router-dom";
import { Button } from "../interfaces";
import { ShoppingCart, PlusIcon, Minus } from "lucide-react";

const Detaile = () => {
  const [productCounter, setProductCounter] = useState(1);
  const { products, addCartProduct }: any = useProduct();
  const route = useLocation();
  const productId = route.pathname.split("/")[3];

  return (
    <>
      <main className="flex flex-col md:flex-row md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:gap-16">
        {products
          .filter((item: any) => productId == item._id)
          .map((item: any) => (
            <>
              <div className="relative md:w-full md:max-w-[500px]">
                <img src={item.imageSrc} className=" rounded-xl" />
              </div>
              <section className="flex flex-col p-6 gap-3 md:w-full md:max-w-[600px]">
                <div>
                  <h2 className="uppercase mb-3 font-bold tracking-[0.13em] text-xs md:text-base">
                    Asthetic Company
                  </h2>

                  <h1 className="font-bold text-3xl md:text-5xl mb-6">
                    {item.name}
                  </h1>

                  <p className="mb-8 md:mb-20">
                    These low-profile sneakers are your perfect casual wear
                    companion. Featuring a durable rubber outer sole, they’ll
                    withstand everything the weather can offer.
                  </p>

                  <div className="flex items-center justify-between md:flex-col md:items-start">
                    <div className="flex gap-4 items-center">
                      <span className="font-bold text-2xl">
                        ${Number(item.price.substring(1)) / 2}
                      </span>
                      <span className="font-bold text-sm">50%</span>
                    </div>

                    <span className="text-grayish-blue text-sm font-bold">
                      <del> {item.price}</del>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 md:flex-row mt-4">
                  <div className="bg-border flex w-ful justify-between items-center px-6 py-1 rounded-lg mt-2 md:w-1/3 md:px-3 md:mt-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        productCounter > 1 &&
                        setProductCounter(productCounter - 1)
                      }
                      disabled={productCounter == 1}
                    >
                      <Minus className="w-3 md:w-4 h-3 md:h-4" />
                    </Button>
                    <div className="font-bold">{productCounter}</div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setProductCounter(productCounter + 1)}
                    >
                      <PlusIcon className="w-3 md:w-4 h-3 md:h-4" />
                    </Button>
                  </div>

                  <Button
                    className="w-full !py-6 font-bold md:w-2/3"
                    onClick={() => {
                      addCartProduct(item, productCounter);
                      setProductCounter(1);
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to cart
                  </Button>
                </div>
              </section>
            </>
          ))}
      </main>

      <h2 className="font-bold text-2xl mt-24 mb-8">Related Prodcuts</h2>
      <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 !mb-12">
        {products
          .filter((item: any) => productId !== item._id)
          .slice(0, 4)
          .map((item: any) => (
            <Product product={item} />
          ))}
      </section>
    </>
  );
};

export default Detaile;
