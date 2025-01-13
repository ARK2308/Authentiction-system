import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin token and redirect to login
    localStorage.removeItem("admintoken");
    navigate("/adminlogin");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="px-6 py-4 text-lg font-bold">Admin Panel</div>
        <nav className="flex-grow px-4 py-2 space-y-2">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md hover:bg-blue-700 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Get All Users
          </NavLink>
          <NavLink
            to="/admin/polls"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md hover:bg-blue-700 ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Get All Polls
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
            <NavLink
              to="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Home
            </NavLink>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-grow p-6">
          <div className="text-lg font-medium text-gray-700">
            Welcome to the Admin Dashboard! Please use the sidebar menu to manage users and polls.
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
