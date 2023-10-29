import { useState, useEffect, createContext, useContext, lazy } from "react";

export const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const getAllProducts = async () => {
    const data = await fetch("/products");
    const res = await data.json();
    setProducts(res);
  };

  const getAllCartProducts = async () => {
    const data = await fetch("/cart");
    const res = await data.json();
    setCart(res);
  };

  const addCartProduct = async (item, quantity) => {
    const data = await fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, quantity: quantity }),
    });
    const res = await data.json();
    setCart([...cart, res]);
  };

  const deleteCartProduct = async (id) => {
    const data = await fetch("/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const res = await data.json();
    setCart(res);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const value = {
    products,
    setProducts,
    getAllCartProducts,
    addCartProduct,
    cart,
    deleteCartProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
