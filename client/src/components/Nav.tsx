import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../interfaces";
import { useTheme } from "next-themes";
import Register from "./Register";
import AddToCart from "./AddToCart";
import SearchBar from "./SearchBar";
import NavUserMenu from "./NavUserMenu";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const { setTheme, theme } = useTheme();
  const { uid } = useAuth();
  return (
    <nav className="flex items-center justify-between h-[100px]">
      <Link to="/" className="text-sm opacity-90 font-medium">
        <h1 className="text-2xl font-bold">Asthetic</h1>
      </Link>

      <div className="flex items-center justify-center space-x-8">
        <Link to="/grocery" className="text-sm opacity-90 font-medium">
          Home
        </Link>
        <Link to="/grocery" className="text-sm opacity-90 font-medium">
          Products
        </Link>
        <Link to="/grocery" className="text-sm opacity-90 font-medium">
          Reviews
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <SearchBar />
        {theme == "dark" ? (
          <Button size="icon" variant="ghost" onClick={() => setTheme("light")}>
            <SunIcon className="w-5 h-5" />
          </Button>
        ) : (
          <Button size="icon" variant="ghost" onClick={() => setTheme("dark")}>
            <MoonIcon className="w-5 h-5" />
          </Button>
        )}
        {uid && <AddToCart />}
        {uid ? <NavUserMenu /> : <Register />}
      </div>
    </nav>
  );
};

export default Nav;
