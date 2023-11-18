import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "../interfaces";
import { MoonIcon, SunIcon, User2 } from "lucide-react";
import { Arrow } from "@radix-ui/react-popover";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavUserMenu = () => {
  const { logout } = useAuth();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" className="w-8 h-8">
          <User2 className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[220px] px-4 py-3 flex flex-col items-start space-y-3"
        align="end"
      >
        <p className="text-sm text-foreground">User Menu</p>
        <Separator className="!my-2" />
        <Link to="/profile/1" className="text-sm font-semibold text-foreground">
          Profile
        </Link>
        <Link to="/" className="text-sm font-semibold text-foreground">
          Order History
        </Link>

        <button
          onClick={() => logout()}
          className="w-full text-start text-sm font-semibold text-foreground"
        >
          Log Out
        </button>
        <Arrow />
      </PopoverContent>
    </Popover>
  );
};

export default NavUserMenu;
