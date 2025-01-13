import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uselogoutfun } from "../redux/slice/userAuthSlice/userAuthSlice";


const PollPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  

  const handleLogout = () => {
      dispatch(uselogoutfun())
      toast.success("user logged out")
      navigate("/")
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="text-xl font-bold">
            <NavLink to="/" className="hover:text-blue-300">
              Poll Logo
            </NavLink>
          </div>

          {/* Middle Navigation Links */}
          <div className="flex space-x-6">
            <NavLink
              to="/create-poll"
              className="hover:text-blue-300 transition"
            >
              Create Poll
            </NavLink>
            <NavLink
              to="/get-all-polls"
              className="hover:text-blue-300 transition"
            >
              Get All Polls
            </NavLink>
            <NavLink
              to="/vote-on-poll"
              className="hover:text-blue-300 transition"
            >
              Vote on Poll
            </NavLink>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to the Poll Page
        </h1>
        <p className="text-gray-600 mt-2">
          Use the navigation links above to create, view, or vote on polls.
        </p>
      </div>
    </div>
  );
};

export default PollPage;
