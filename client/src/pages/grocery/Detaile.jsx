import React, { useState } from "react";
import Nav from "./components/Nav";
import Product from "./components/Product";
import { useProduct } from "./context/ProductContext";
import { useLocation } from "react-router-dom";
const Detaile = () => {
  const [productCounter, setProductCounter] = useState(0);
  const { products } = useProduct();
  const route = useLocation();

  
  return (
    <>
      <Nav />
      <main className="flex flex-col md:flex-row md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:gap-16">
        {products
          .filter((item) => route.pathname.split("/")[3] == item._id)
          .map((item) => (
            <>
              <div className="relative md:w-full md:max-w-[500px]">
                <img src={item.imageSrc} className=" rounded-xl" />
              </div>
              <section className="flex flex-col p-6 gap-3 md:w-full md:max-w-[600px]">
                <div>
                  <h2 className="uppercase text-orange mb-3 font-bold tracking-[0.13em] text-xs md:text-base">
                    Asthetic Company
                  </h2>

                  <h1 className="font-bold text-3xl mb-4 md:text-5xl md:mb-10">
                    {item.name}
                  </h1>

                  <p className="text-dark-grayish-blue mb-5 text-sm leading-[22px] md:text-base">
                    These low-profile sneakers are your perfect casual wear
                    companion. Featuring a durable rubber outer sole, they’ll
                    withstand everything the weather can offer.
                  </p>

                  <div className="flex items-center justify-between md:flex-col md:items-start mt-2">
                    <div className="flex gap-4 items-center">
                      <span className="font-bold text-2xl">
                        ${Number(item.price.substring(1)) / 2}
                      </span>
                      <span className="bg-pale-orange text-orange font-bold text-sm px-2 rounded-md">
                        50%
                      </span>
                    </div>

                    <span className="text-grayish-blue text-sm font-bold">
                      <del> {item.price}</del>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 md:flex-row">
                  <div className="flex w-full bg-slate-200 justify-between items-center px-6 py-2 rounded-xl mt-2 md:w-1/3 md:px-3 md:mt-0">
                    <button
                      onClick={() => setProductCounter(productCounter - 1)}
                      className="font-bold text-2xl pb-1"
                    >
                      -
                    </button>

                    <div className="font-bold">{productCounter}</div>

                    <button
                      onClick={() => setProductCounter(productCounter + 1)}
                      className="font-bold text-2xl w-[1rem] pb-1"
                    >
                      +
                    </button>
                  </div>

                  <button className="w-full bg-black text-white py-4 rounded-xl font-bold shadow-[0_10px_30px_-12px] shadow-orange md:w-2/3">
                    <div className="flex gap-4 justify-center">
                      <svg
                        width="22"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                          fill="currentColor"
                          fillRule="nonzero"
                        />
                      </svg>
                      Add to cart
                    </div>
                  </button>
                </div>
              </section>
            </>
          ))}
      </main>

      <h2 className="font-bold text-2xl mt-16 mb-8">Related Prodcuts</h2>
      <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"></section>
    </>
  );
};

export default Detaile;
