import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useToast } from "../interfaces";
import { useAuth } from "./AuthContext";

// Types
export type ProductType = {
  name: string;
  price: number;
  image: string;
  description?: string;
  _id?: string;
  quantity?: number;
  cetagory: string;
  keywords: string[];
};
type ProductContextType = {
  products: ProductType[];
  cart: ProductType[];
  setCart: React.Dispatch<React.SetStateAction<ProductType[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResult: ProductType[];
  setsSearchResult: React.Dispatch<React.SetStateAction<ProductType[]>>;
  addCartProduct: (item: ProductType, quantity: number) => void;
  deleteCartProduct: (id: string) => void;
  addNewProduct: ({
    name,
    image,
    description,
    price,
  }: ProductType) => Promise<number | undefined>;
  getSearchedProducts: (query: string) => Promise<ProductType[]>;
};
type Children = { children: React.ReactNode };

// Context
export const ProductContext = createContext<ProductContextType | null>(null);
export const useProduct = () => useContext(ProductContext)!;

const ProductContextProvider: React.FC<Children> = ({ children }: Children) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<ProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setsSearchResult] = useState<ProductType[]>([]);
  const { toast } = useToast();
  const { uid, currentUser } = useAuth();

  // Get All Display Products
  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/v1/products/all-products");
      response.status == 200 && setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Add New Products
  const addNewProduct = async ({
    name,
    image,
    description,
    price,
    cetagory,
    keywords,
  }: ProductType) => {
    if (!name || !image || !description || !price || !cetagory || !keywords) {
      toast({ title: "Please Fill All The Fildes", variant: "destructive" });
    } else {
      try {
        const data = { name, image, description, price, cetagory, keywords };
        const response = await axios.post(
          `/api/v1/products/add-product`,
          data,
          {
            headers: {
              Authorization: `Bearer ${uid}`,
            },
          }
        );
        console.log("response", response);
        return response.status;
      } catch (error) {
        console.log(error);
        toast({
          title: "Something Went Wrong! Failed to add new product",
          variant: "destructive",
        });
      }
    }
  };
  // Search Product
  const getSearchedProducts = async (query: string) => {
    if (query.length < 2) return;
    try {
      const response = await axios.post(
        "/api/v1/products/search",
        { search: query },
        {}
      );

      return response.data.length === 0 ? null : response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Get All Cart Products
  const getAllCartProducts = async () => {
    try {
      const response = await axios.get("/api/v1/products/all-carts", {
        headers: {
          Authorization: `Bearer ${uid}`,
        },
      });
      response.status == 200 && setCart(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Product To Cart
  const addCartProduct = async (item: ProductType, quantity: number) => {
    const data = {
      productId: item._id,
      quantity: quantity,
    };
    try {
      const response = await axios.post("/api/v1/products/add-cart", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${uid}`,
        },
      });
      if (response.status == 200 || response.status == 201) {
        toast({ title: `✨ ${item.name} added` });
        setCart(response.data.products);
      }
    } catch (error: any) {
      console.log(error);
      toast({ title: "Something went wrong!", variant: "destructive" });
    }
  };

  // Delete Product From Cart
  const deleteCartProduct = async (id: string) => {
    try {
      const response = await axios.delete(
        `/api/v1/products/delete-cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${uid}`,
          },
        }
      );
      response.status == 200 && setCart(response.data.products);
    } catch (error: any) {
      console.log(error);
      toast({ title: "Something went wrong!", variant: "destructive" });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (Boolean(uid)) {
      getAllCartProducts();
    }
  }, [uid]);

  const value: ProductContextType = {
    products,
    cart,
    setCart,
    addCartProduct,
    deleteCartProduct,
    addNewProduct,
    searchQuery,
    setSearchQuery,
    searchResult,
    setsSearchResult,
    getSearchedProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
