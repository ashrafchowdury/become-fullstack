import { Link } from "react-router-dom";
import { ProductType } from "../context/ProductContext";

const Product = ({ product }: { product: ProductType }) => {
  return (
    <Link
      key={product._id}
      to={`/product/${product._id}`}
      className="group m-2 lg:m-4"
    >
      <div className=" sm:w-[200px] md:w-[228px] lg:w-[312px] xl:w-[283px] sm:h-[200px] md:h-[228px] lg:h-[312px] xl:h-[283px] overflow-hidden rounded-lg">
        <img
          src={product.image}
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
