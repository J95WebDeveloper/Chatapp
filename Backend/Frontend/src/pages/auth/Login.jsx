import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useLogin } from "../../hooks/useLogin";
import { Validation } from "../../validation/loginValidation";


function Login() {

  const { setAuthUser } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Validation(values)) {
      useLogin(values, setAuthUser, navigate);
    }
  };

  return (
    <div className="h-[92vh] md:h-screen bg flex items-center justify-center">
      <div className="cart min-w-[320px] max-w-[450px] w-[80%] px-5 py-10 md:p-12 md:py-15 text-center">
            <h1 className="text-4xl font-semibold mb-12 lg:text-4xl">
              Welcome 
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 mb-3"
              autoComplete="off">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="enter your email"
                className="py-2 px-4 border-2 border-border rounded-md focus:outline-none"
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="enter your password"
                className="py-2 px-4 border-2 border-border rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="py-2.5 mt-2 bg-darkBlue rounded-md text-lg active:scale-95 cursor-pointer">
                Login
              </button>
            </form>
            <div>
              <span className="text-gray-300 text-sm md:text-[16px]">Don't have an account?</span>{" "}
              <Link to={"/register"}>
                <span className="text-blue font-semibold ml-3 md:text-[18px] cursor-pointer">
                  Signup
                </span>
              </Link>
            </div>
      </div>
    </div>
  );
}

export default Login;
