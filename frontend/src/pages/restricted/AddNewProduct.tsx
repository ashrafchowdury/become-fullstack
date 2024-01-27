import { useState, ChangeEvent, useEffect } from "react";
import {
  Input,
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../interfaces";
import { useProduct } from "../../context/ProductContext";

type Input = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const AddNewProduct = () => {
  const { addNewProduct } = useProduct();
  const [fileds, setFileds] = useState({
    image: "",
    name: "",
    description: "",
    price: 0,
    cetagory: "",
    keywords: "",
  });
  const filedValues = {
    image:
      fileds.image ||
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-08.jpg",
    name: fileds.name || "Focus Carry Pouch",
    description:
      fileds.description ||
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    price: fileds.price || 85,
    cetagory: fileds.cetagory || "",
    keywords: fileds.keywords || "Hello, HI, Bye, Ok, Notion",
  };
  const cetagories = ["stationary", "wallet", "home & kitchen"];

  const handleNewProduct = async () => {
    await addNewProduct({ ...fileds, keywords: fileds.keywords.split(",") });
    clearStates();
  };

  const onChange = (event: Input, fieldName: string) => {
    if (fieldName === "cetagory") {
      setFileds({ ...fileds, [fieldName as string]: event });
    } else {
      setFileds({ ...fileds, [fieldName]: event.target.value });
    }
  };

  const clearStates = () => {
    setFileds({
      image: "",
      name: "",
      description: "",
      price: 0,
      cetagory: "",
      keywords: "",
    });
  };

  return (
    <main className="flex items-center">
      <section className="h-[80vh] my-6 border-r w-1/2 pr-8">
        <h2 className="text-xl font-semibold">Add new Product</h2>
        <p className="text-sm text-foreground mt-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <div className="mt-12 space-y-6">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of your product"
              value={fileds.name}
              onChange={(e: Input) => onChange(e, "name")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="Add product image URL"
              value={fileds.image}
              onChange={(e: Input) => onChange(e, "image")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              placeholder="Product Description"
              value={fileds.description}
              onChange={(e: Input) => onChange(e, "description")}
              className="bg-background border rounded-lg px-4 py-3 text-sm h-32"
            ></textarea>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="Product Price"
              min={0}
              value={fileds.price}
              onChange={(e: Input) => onChange(e, "price")}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="cetagory">Cetagory</Label>
            <Select onValueChange={(value: any) => onChange(value, "cetagory")}>
              <SelectTrigger id="cetagory">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                {cetagories.map((item) => (
                  <SelectItem value={item} key={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="image">Keywords</Label>
            <Input
              id="keywords"
              placeholder="Add product keywords"
              value={fileds.keywords}
              onChange={(e: Input) => onChange(e, "keywords")}
            />
          </div>
        </div>
        <div className="flex justify-between mt-16">
          <Button variant="outline" onClick={clearStates}>
            Cancel
          </Button>
          <Button onClick={handleNewProduct}>Deploy</Button>
        </div>
      </section>

      <section className="h-[80vh] my-6 border-l w-1/2 pl-8">
        <h2 className="text-xl font-semibold">Product Preview</h2>
        <p className="text-sm text-foreground mt-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>

        <div className="space-y-3 mt-12">
          <img
            src={filedValues.image}
            alt={filedValues.name}
            className="w-full h-[270px] rounded-lg object-cover"
          />
          <p className="text-lg font-bold">{filedValues.name}</p>
          <p className="text-sm text-foreground">{filedValues.description}</p>
          <div className="w-full flex items-center justify-between !mt-7 !mb-8">
            <p className="text-normal">Price: {filedValues.price}.00$</p>
            <p className="text-normal">Cetagory: {filedValues.cetagory}</p>
          </div>

          <div>
            <p className="mb-5">Keywords</p>
            <div className="flex items-center space-x-3">
              {filedValues.keywords.split(",").map((item) => (
                <p className="text-sm px-3 py-[6px] bg-secondary rounded-lg">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddNewProduct;
