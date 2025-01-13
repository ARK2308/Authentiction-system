import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AdminAuthLogin } from "../redux/slice/adminAuthSlice/AdminSlice";


const AdminLogin = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpValue, setInpValue] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInpValue({ ...inpValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inpValue;

    if (!email) {
      toast.error("Email is required!");
    } else if (!email.includes("@")) {
      toast.error("Enter a valid email!");
    } else if (!password) {
      toast.error("Password is required!");
    } else {
      try {
        const res = await dispatch(AdminAuthLogin(inpValue));
        if (res.payload?.token) {
          toast.success("Login successful!");
          navigate("/admin/dashboard");
        } else {
          toast.error("Invalid credentials!");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={inpValue.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={passShow ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={inpValue.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setPassShow(!passShow)}
                className="absolute right-3 top-2.5 text-sm text-blue-500 cursor-pointer"
              >
                {passShow ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
