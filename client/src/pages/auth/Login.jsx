import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleUserAuthData = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const data = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await data.json();
    console.log(res);

    event.target[0].value = "";
    event.target[1].value = "";
  };

  return (
    <>
      <Link to="/auth">
        <button className=" flex items-center justify-center font-bold text-xl w-[40px] h-[35px] rounded-md bg-slate-300 absolute top-10 left-[15%] transform translate-x-[-15%]">
          <span className="-mt-1">{"<-"}</span>
        </button>
      </Link>
      <section className="flex flex-col lg:flex-row justify-center items-start lg:space-x-9 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <div className=" w-full lg:w-[300px] mb-10 lg:mb-0">
          <h1 className=" text-2xl md:text-3xl font-bold mb-4">
            Log in or create an account
          </h1>
          <p className=" text-sm md:text-[16px]">
            Quickly get started by signing in using your existing accounts.
          </p>
        </div>

        <div className="w-full sm:w-[400px]">
          <p className=" text-[16px] md:text-xl font-medium mb-6">
            Choose you signing methods
          </p>

          <form onSubmit={handleUserAuthData} className="w-full">
            <label className=" font-medium">Enter your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-3 text-sm md:text-[16px] rounded-lg border-2 border-black mt-2 mb-5"
              required
            />

            <label className=" text-sm md:text-[16px] font-medium">
              Password add minimum 8 characters
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg bg-glass mt-2 border-2 border-black outline-transparent"
              required
            />

            <button
              type="submit"
              className="w-full bg-black flex justify-center font-semibold text-white rounded-lg px-4 py-3 mt-9"
            >
              Log in
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
