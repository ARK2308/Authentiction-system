import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userlogin } from "../redux/slice/userAuthSlice/userAuthSlice";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passShow, setPassShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.trim()) {
      toast.error("Email is required!");
    } else if (!email.includes("@")) {
      toast.error("Enter a valid email address!");
    } else if (!password.trim()) {
      toast.error("Password is required!");
    } else {
      dispatch(userlogin(formData))
        .then((res) => {
          if (res?.payload) {
            toast.success("Login successful!");
            navigate("/pollpage");
            setFormData({ email: "", password: "" });
          } else {
            toast.error(res?.error || "Login failed!");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          toast.error("An error occurred. Please try again.");
        });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type={passShow ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              onClick={() => setPassShow(!passShow)}
              className="absolute top-2.5 right-3 text-sm cursor-pointer text-gray-500"
            >
              {passShow ? "Hide" : "Show"}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Login;
