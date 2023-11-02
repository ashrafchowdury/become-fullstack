import { Link } from "react-router-dom";
import { Input, Button } from "../interfaces";

const Home = () => {
  return (
    <main className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
      <nav className="py-4 px-8 rounded-xl border flex items-center space-x-9">
        <Link to="/todo" className=" font-bold">
          ToDo
        </Link>
        <Link to="/auth" className=" font-bold">
          Authentication
        </Link>
        <Link to="/grocery" className=" font-bold">
          Grocery
        </Link>
      </nav>
    </main>
  );
};

export default Home;
