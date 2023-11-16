import { useNavigate } from "react-router-dom";
import { Button } from "../interfaces";
import { SendHorizontal } from "lucide-react";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className=" absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] flex flex-col items-center">
      <h1 className="text-5xl font-bold whitespace-nowrap">
        404 Page Not Found {":("}
      </h1>
      <Button
        className="px-8 !py-5 mt-16 font-bold"
        onClick={() => navigate("/")}
      >
        Go Back <SendHorizontal className="w-4 h-4 ml-2" />
      </Button>
    </section>
  );
};

export default NotFound;
