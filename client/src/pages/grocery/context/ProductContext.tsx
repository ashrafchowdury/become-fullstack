import { useState, useEffect, createContext, useContext, lazy } from "react";
import { useToast } from "../../../interfaces";

export const ProductContext = createContext(null);
export const useProduct = () => useContext(ProductContext)!;

const ProductContextProvider = ({ children }: any) => {
  const [products, setProducts] = useState<any>([]);
  const [cart, setCart] = useState<any>([]);
  const { toast } = useToast();

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

  const addCartProduct = async (item: any, quantity: any) => {
    const data = await fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, quantity: quantity }),
    });
    const res = await data.json();
    toast({ title: `✨ ${item.name} added` });
    setCart([...cart, res]);
  };

  const deleteCartProduct = async (id: any) => {
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

  const value: any = {
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
