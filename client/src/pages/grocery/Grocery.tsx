import Nav from "./components/Nav";
import Product from "./components/Product";
import { useProduct } from "./context/ProductContext";

const Grocery = () => {
  const { products }: any = useProduct();
  return (
    <>
      <Nav />
      <header>
        <img
          src="https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm90ZXN8ZW58MHwwfDB8fHww"
          alt="image"
          className="w-full rounded-lg h-[380px] object-cover"
        />
      </header>

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className=" font-bold text-2xl mb-8">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: any) => (
            <Product product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Grocery;
