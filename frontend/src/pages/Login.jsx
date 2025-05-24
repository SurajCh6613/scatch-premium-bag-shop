import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",  // recieve token 
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = "Failed to login";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setMessage("User Logged in successfully");
      navigate("/dashboard")
    } catch (error) {
      setMessage(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-90 h-120  shadow-2xl p-8 flex flex-col gap-4">
        <h1 className="text-3xl text-center">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xs text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleOnChange}
              className="shadow p-2 rounded-md"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-xs text-gray-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleOnChange}
              className="shadow p-2 rounded-md"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md w-[100px] ml-[90px] text-white font-semibold"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="text-green-500 text-center mt-2">{message}</p>
        )}

        <div className="ml-[80px] mt-4">
          New User?{" "}
          <Link className="text-blue-500" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
