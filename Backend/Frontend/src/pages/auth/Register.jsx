import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { Validation } from "../../validation/registerValidation";


function Register() {
  const [values, setValues] = useState({
    fullname: "",
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
      useRegister(values, navigate);
    }
  };

  return (
    <div className="h-[92vh] md:h-screen bg flex items-center justify-center">
        <div className="cart min-w-[320px] max-w-[450px] w-[80%] px-5 py-10 md:p-12 md:py-15 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-10 md:mb-12 lg:text-4xl">
              Create an Account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 mb-3"
              autoComplete="off"
            >
              <input
                type="text"
                name="fullname"
                onChange={handleChange}
                placeholder="enter your name"
                className="py-2 px-4 border-2 border-border rounded-md focus:outline-none"
              />

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
                className="py-2 px-4 rounded-md border-2 border-border focus:outline-none"
              />
              <button
                type="submit"
                className="py-2.5 mt-2 bg-darkBlue rounded-md text-lg active:scale-95 cursor-pointer"
              >
                Create
              </button>
            </form>
            <div>
              <span className="text-gray-300 text-sm md:text-[16px]">Already have an account?</span>{" "}
              <Link to={"/login"}>
                <span className="text-blue font-semibold ml-3 md:text-[18px] cursor-pointer">
                  Login
                </span>
              </Link>
            </div>
        </div>
    </div>
  );
}

export default Register;
