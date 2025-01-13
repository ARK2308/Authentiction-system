import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRegister } from "../redux/slice/userAuthSlice/userAuthSlice";
import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [passShow, setPassShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { firstname, lastname, email, password } = formData;
  
    if (!firstname.trim()) {
      toast.error("First name is required!");
    } else if (!lastname.trim()) {
      toast.error("Last name is required!");
    } else if (!email.trim()) {
      toast.error("Email is required!");
    } else if (!email.includes("@")) {
      toast.error("Enter a valid email address!");
    } else if (!password.trim()) {
      toast.error("Password is required!");
    } else {
      const data = new FormData();
      data.append("firstname", firstname);
      data.append("lastname", lastname);
      data.append("email", email);
      data.append("password", password);
  
      const config = {
        "Content-Type": "application/json",
      };
  
      const datasend = {
        data,
        config,
      };
  
      dispatch(UserRegister(datasend))
        .unwrap()
        .then(() => {
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          });
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error during registration:", error);
        });
    }
  };
  


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter Your First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter Your Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <input
              type={passShow ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-sm text-gray-600"
              onClick={() => setPassShow(!passShow)}
            >
              {passShow ? "Hide" : "Show"}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Log In
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Register;
