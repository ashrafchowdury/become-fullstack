import { Link } from "react-router-dom";
import Product from "../components/Product";
import { useProduct } from "../context/ProductContext";

const Home = () => {
  const { products }: any = useProduct();
  return (
    <>
      <header>
        <img
          src="https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm90ZXN8ZW58MHwwfDB8fHww"
          alt="image"
          className="w-full rounded-lg h-[380px] object-cover"
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
