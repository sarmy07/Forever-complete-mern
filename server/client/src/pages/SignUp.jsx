import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "./redux/features/user/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/user/userSlice";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading, error }] = useSignupMutation();

  // console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData).unwrap();
      dispatch(setUser({ user: res }));
      toast.success("user created success");
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error(error?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center mt-5 mx-auto  max-w-md p-6 gap-5"
      >
        <h1 className="flex items-center gap-2">
          <span className="text-3xl ">Sign Up</span>
          <hr className="w-8 h-[1.5px] text-slate-700" />
        </h1>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="placeholder:text-slate-500 border p-2 w-full outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="placeholder:text-slate-500 border p-2 w-full outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="placeholder:text-slate-500 border p-2 w-full outline-none"
        />

        <div className="flex justify-between w-full px-1">
          <span className="text-sm">Forgot password?</span>
          <Link to={"/login"} className="text-sm">
            Login Here
          </Link>
        </div>

        <button
          disabled={isLoading}
          className="bg-black text-white py-2 px-8 cursor-pointer"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
