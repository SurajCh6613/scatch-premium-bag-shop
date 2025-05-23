import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Add form data from body
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

     const contentType = response.headers.get("content-type");

    if (!response.ok) {
      let errorMessage = "Failed to register";
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      }
      throw new Error(errorMessage);
    }
      const data = await response.json();
      console.log("Registered", data);
      setMessage("User Registered Successfully");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      {console.log(formData)}
      <div className="w-90 h-120  shadow-2xl p-8 flex flex-col gap-4">
        <h1 className="text-3xl text-center">Register here</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-xs text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="shadow p-2 rounded-md"
              placeholder="Full Name"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xs text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="shadow p-2 rounded-md"
              placeholder="example@gmail.com"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-xs text-gray-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="shadow p-2 rounded-md"
              placeholder="Password"
              required
              onChange={handleOnChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md w-[100px] ml-[90px] text-white font-semibold"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="text-green-500 text-center mt-2">{message}</p>
        )}
        <div className="ml-[40px] mt-4">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
