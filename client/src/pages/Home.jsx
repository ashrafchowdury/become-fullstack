import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className=" w-screen h-screen flex items-center justify-center">
      <nav className="py-4 px-8 rounded-xl border flex items-center space-x-9">
        <Link to="/todo" className=" font-bold">
          ToDo
        </Link>
        <Link to="/auth" className=" font-bold">
          Authentication
        </Link>
        <Link to="/" className=" font-bold">
          Chat App
        </Link>
      </nav>
    </main>
  );
};

export default Home;
