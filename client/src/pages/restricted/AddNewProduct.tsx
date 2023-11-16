import { useState, ChangeEvent } from "react";
import {
  Input,
  Label,
  Button,
  useToast,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../interfaces";
import axios from "axios";

type Input = ChangeEvent<HTMLInputElement>;

const AddNewProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [cetagory, setCetagory] = useState("");
  const { toast } = useToast();

  const addNewProduct = async () => {
    if (!name || !img || !desc || !price || price == "0") {
      toast({ title: "Please Fill All The Fildes", variant: "destructive" });
    } else {
      try {
        const addProduct = await axios.post("/api/addproduct", {
          name: name,
          imageSrc: img,
          price: `$${price}`,
        });
        clearStates();
      } catch (error) {
        console.log(error);
        toast({ title: "Something Went Wrong!", variant: "destructive" });
      }
    }
  };
  const clearStates = () => {
    setName("");
    setDesc("");
    setImg("");
    setPrice("");
  };
  return (
    <section className="flex flex-wrap items-center justify-center h-[80vh] my-6">
      <Card className="w-[90%] md:w-[550px] m-8">
        <CardHeader>
          <CardTitle>Add new Product</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your product"
                value={name}
                onChange={(e: Input) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                placeholder="Add product image URL"
                value={img}
                onChange={(e: Input) => setImg(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Product Description"
                value={desc}
                onChange={(e: Input) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder="Product Price"
                value={price}
                onChange={(e: Input) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cetagory">Cetagory</Label>
              <Select>
                <SelectTrigger id="cetagory">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={clearStates}>
            Cancel
          </Button>
          <Button onClick={addNewProduct}>Deploy</Button>
        </CardFooter>
      </Card>

      <Card className="w-[90%] md:w-[550px] m-8">
        <CardHeader>
          <CardTitle>Product Preview</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <section className=" space-y-3">
            <img
              src={
                !img
                  ? "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-08.jpg"
                  : img
              }
              alt={!name ? "Focus Carry Pouch" : name}
              className="w-full h-[270px] rounded-lg object-cover"
            />
            <p className="text-lg font-bold">
              {!name ? "Focus Carry Pouch" : name}
            </p>
            <p className="text-sm text-foreground">
              {!desc
                ? "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer."
                : desc}
            </p>
            <div className="w-full flex items-center justify-between !mt-7 px-1">
              <p className="text-sm">Price: {price == "" ? 85 : price}.00$</p>
              <p className="text-sm">Cetagory</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default AddNewProduct;
