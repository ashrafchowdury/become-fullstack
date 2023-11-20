import { useState, useEffect, createContext, useContext, lazy } from "react";
import axios from "axios";
import { useToast } from "../interfaces";
import { useAuth } from "./AuthContext";

export const ProductContext = createContext(null);
export const useProduct = () => useContext(ProductContext)!;

const ProductContextProvider = ({ children }: any) => {
  const [products, setProducts] = useState<any>([]);
  const [cart, setCart] = useState<any>([]);
  const { toast } = useToast();
  const { uid } = useAuth();

  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      setProducts(response.data);
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  };

  const getAllCartProducts = async () => {
    if (uid) return;
    try {
      const response = await axios.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      response.status == 200 && setCart(response.data);
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  };

  const addCartProduct = async (item: any, quantity: any) => {
    try {
      const response = await axios.post("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${uid}`,
        },
        body: JSON.stringify({ ...item, quantity: quantity }),
      });
      toast({ title: `✨ ${item.name} added` });
      setCart([...cart, response.data]);
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  };

  const deleteCartProduct = async (id: any) => {
    try {
      const response = await axios.post("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${uid}`,
        },
        body: JSON.stringify({ id }),
      });
      setCart(response.data);
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
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
