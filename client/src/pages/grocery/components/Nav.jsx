import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between h-[100px]">
      <h1 className="text-xl font-bold">Asthetic</h1>
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
      <Link to="/grocery/cart">
        <button className=" px-5 py-[6px] bg-black text-white rounded-md font-semibold uppercase">
          Cart
        </button>
      </Link>
    </nav>
  );
};

export default Nav;
