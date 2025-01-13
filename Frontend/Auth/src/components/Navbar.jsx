import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6 px-8 bg-white shadow-md">
      <div className="text-2xl font-bold">Logo</div>
    
      <div className="space-x-4">
        <Link
          to="/login"
          className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
