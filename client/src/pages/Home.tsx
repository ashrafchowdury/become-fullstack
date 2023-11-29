import { Link } from "react-router-dom";
import Product from "../components/Product";
import { useProduct } from "../context/ProductContext";

const Home = () => {
  const { products }: any = useProduct();
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
          {products.map((product: any) => (
            <Product product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
