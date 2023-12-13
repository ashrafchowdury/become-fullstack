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
import { useProduct } from "../../context/ProductContext";

type Input = ChangeEvent<HTMLInputElement>;

const AddNewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [price, setPrice] = useState("");
  const [cetagory, setCetagory] = useState("");
  const { addNewProduct } = useProduct();

  const handleNewProduct = async () => {
    const status = await addNewProduct({ name, imageSrc, price, description });
    status == 201 && clearStates();
  };

  const clearStates = () => {
    setName("");
    setDescription("");
    setImageSrc("");
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
                value={imageSrc}
                onChange={(e: Input) => setImageSrc(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Product Description"
                value={description}
                onChange={(e: Input) => setDescription(e.target.value)}
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
          <Button onClick={handleNewProduct}>Deploy</Button>
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
                !imageSrc
                  ? "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-08.jpg"
                  : imageSrc
              }
              alt={!name ? "Focus Carry Pouch" : name}
              className="w-full h-[270px] rounded-lg object-cover"
            />
            <p className="text-lg font-bold">
              {!name ? "Focus Carry Pouch" : name}
            </p>
            <p className="text-sm text-foreground">
              {!description
                ? "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer."
                : description}
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
