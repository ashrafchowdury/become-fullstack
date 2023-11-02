import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const getUserProfile = async () => {
    const data = await fetch("/user");
    const res = await data.json();
    setData(res);
    setIsLoading(false);
  };

  const logout = async () => {
    const call = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });
    const res = await call.json();
    setData({});
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between h-[100px]">
        <h1 className="text-xl font-semibold">Authentication</h1>
        <div className="flex items-center space-x-3">
          <Link to="/auth/login">
            <button className=" px-5 py-2 bg-slate-300 rounded-md font-semibold">
              Login
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className=" px-5 py-2 bg-black text-white rounded-md font-semibold">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
      <section className="mt-28">
        <h1 className=" text-center text-5xl font-bold mb-24">Profile</h1>
        {data?._id ? (
          <section className="flex flex-col items-center space-y-4">
            {data?.image && (
              <img
                src=""
                alt=""
                className="w-[50px] h-[50px] rounded-full !mb-7"
              />
            )}

            <p className="capitalize font-bold text-xl">Name: {data?.name}</p>
            <p className="font-bold text-xl">Email: {data?.email}</p>
            <p className="font-bold text-xl">Id: {data?._id}</p>
            <button
              onClick={logout}
              className="!mt-28 px-16 py-2 bg-black text-white rounded-md font-semibold"
            >
              Log Out
            </button>
          </section>
        ) : (
          <div className="flex items-center justify-center mt-48">
            <Link to="/auth/login">
              <button className=" px-12 py-2 bg-slate-300 rounded-md font-semibold">
                Login
              </button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Auth;
