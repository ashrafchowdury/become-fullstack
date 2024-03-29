import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Separator,
  DialogFooter,
  DialogClose,
} from "../interfaces";
import { SearchIcon, MoveRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProduct, ProductType } from "../context/ProductContext";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProducts, setSearchProducts] = useState<ProductType[] | null>();
  const { getSearchedProducts, setsSearchResult, products } = useProduct();

  const handleGetSearchResult = async () => {
    const data = await getSearchedProducts(searchQuery);
    setSearchProducts(data);
  };

  return (
    <>
      <Dialog onOpenChange={() => setSearchProducts(products.slice(0, 3))}>
        <DialogTrigger asChild>
          <Button size="icon" className="w-10 h-10" variant="ghost">
            <SearchIcon className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="searchDialog sm:max-w-[680px] px-5 py-5">
          <div className="w-full relative p-0 m-0 flex items-center">
            <SearchIcon className="w-4 h-4 absolute top-[14px] left-3" />
            <Input
              placeholder="Search Products"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-base py-5 px-9"
            />
            <Button
              size="icon"
              className="w-12 h-[41px] !flex ml-2"
              onClick={handleGetSearchResult}
            >
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div>

          <DialogFooter className="!block">
            <p className="opacity-70 mb-3 text-sm">Search Result</p>
            <section className="flex flex-col">
              {searchProducts?.map((item) => (
                <Link
                  to={`/product/search/${searchQuery}/${item._id}`}
                  onClick={() => setsSearchResult(searchProducts)}
                >
                  <DialogClose className="!block">
                    <div className="group/item w-full flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg mr-3"
                      />
                      <div className="w-full flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-start">{item.price}</p>
                        </div>
                        <p className="text-xs flex items-center">
                          View Product{" "}
                          <MoveRightIcon className="w-4 h-4 ml-1 group-hover/item:translate-x-2 duration-300" />
                        </p>
                      </div>
                    </div>
                    <Separator className="w-full my-4" />
                  </DialogClose>
                </Link>
              ))}

              {searchProducts === null && (
                <p className="text-normal my-20 mx-auto">
                  Searched product not found!
                </p>
              )}
            </section>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchBar;
