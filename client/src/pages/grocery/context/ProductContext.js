import { useState, useEffect, createContext, useContext, lazy } from "react";

export const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const data = await fetch("/products");
    const res = await data.json();
    setProducts(res);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const value = {
    products,
    setProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
