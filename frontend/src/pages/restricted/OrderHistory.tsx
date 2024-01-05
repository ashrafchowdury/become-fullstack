import { useState, useEffect } from "react";
import { useProduct, ProductType } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";
import GoBack from "../../components/GoBack";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../../interfaces";
import axios from "axios";

type OrderTyp = {
  _id: string;
  products: {
    product: ProductType;
    quantity: number;
    _id: string;
  }[];
  orderDate: Date;
  total: number;
  phone: string;
  address: string;
};

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderTyp[]>([]);
  const { uid } = useAuth();

  useEffect(() => {
    const getOrderHistoryData = async () => {
      try {
        const response = await axios.get("/api/v1/order/history", {
          headers: {
            Authorization: `Bearer ${uid}`,
          },
        });
        response.status == 200 && setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderHistoryData();
  }, [uid]);

  return (
    <>
      {orders.length == 0 ? (
        <p className="text-3xl absolute top-[50%] left-[50%] opacity-70 transform -translate-y-[50%] -translate-x-[50%]">
          Order history is empty {`:(`}
        </p>
      ) : (
        <>
          <div className="xl:mx-32 mt-16 mb-10">
            <h1 className="text-2xl font-bold mb-2">Order History</h1>
            <p className="w-[70%] text-foreground opacity-80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates quidem doloremque eum? Incidunt, adipisci impedit?
            </p>
          </div>

          {orders.map((item) => (
            <section
              className="border rounded-lg my-10 xl:mx-32"
              key={item._id}
            >
              <div className="flex items-center space-x-10 h-[80px] border-b px-10 mb-12">
                <div className="space-y-1">
                  <p className="text-base">Order Number</p>
                  <p className="text-sm text-foreground opacity-80">
                    {item._id.slice(0, 10)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-base">Date placed</p>
                  <p className="text-sm text-foreground opacity-80">
                    {new Date(item.orderDate).toDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-base">Total amount</p>
                  <p className="text-sm text-foreground opacity-80">
                    ${item.total}
                  </p>
                </div>
              </div>

              {item.products.map((value) => (
                <div className="px-10" key={value._id}>
                  <div className="flex">
                    <img
                      src={value.product?.imageSrc}
                      alt="image"
                      className="w-40 h-40 rounded-lg mr-4"
                    />
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <p className="text-xl font-semibold">
                          {value.product?.name}
                        </p>
                        <p className="font-bold">{value.product?.price}</p>
                      </div>

                      <p className="text-sm opacity-80">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptates quidem doloremque eum? Incidunt, adipisci
                        impedit? Lorem ipsum dolor sit amet.
                      </p>
                      <p>Product Id: {value.product?._id}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 " />
                          <p>Order on July 12, 2021</p>
                        </div>
                        <Link
                          to={`/product/${value.product?._id}`}
                          className="text-sm underline"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-7 w-full" />
                </div>
              ))}
            </section>
          ))}
        </>
      )}
    </>
  );
};

export default OrderHistory;
