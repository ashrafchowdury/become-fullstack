import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }: any) => {
  return (
    <Link
      key={product._id}
      to={`/grocery/product/${product._id}`}
      className="group m-4"
    >
      <div className="aspect-h-1 aspect-w-1 w-[280px] h-[280px] overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-base">{product.name}</h3>
      <p className="mt-1 text-lg font-medium ">{product.price}</p>
    </Link>
  );
};

export default Product;
