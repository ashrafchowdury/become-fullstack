import Product from "../components/Product";
import { useProduct } from "../context/ProductContext";
import { useLocation } from "react-router-dom";
import ReviewProduct from "../components/ReviewProduct";

const Home = () => {
  const { products } = useProduct();
  const location = useLocation();
  const orderStatus = location.search.split("=");

  return (
    <>
      <header className="w-full h-[220px] md:h-[250px] lg:h-[380px] rounded-lg flex overflow-hidden">
        <img
          src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg"
          alt="image"
          className="w-full h-[220px] md:h-[250px] lg:h-[380px] object-cover"
        />
      </header>

      <section className="mt-20 ">
        <h2 className=" font-bold text-2xl mb-8">Products</h2>
        <div className="flex flex-wrap items-center justify-start md:-ml-3">
          {products.map((product) => (
            <Product product={product} />
          ))}
        </div>
      </section>
      {orderStatus[1]?.includes("succeed") && (
        <ReviewProduct productId={orderStatus[2]} />
      )}
    </>
  );
};

export default Home;
