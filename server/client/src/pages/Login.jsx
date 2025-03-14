import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./redux/features/user/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/user/userSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const res = await login(formData).unwrap();
      dispatch(setUser({ user: res }));
      toast.success("login success");
      console.log(res);
      navigate("/");
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
          <span className="text-3xl ">Login</span>
          <hr className="w-8 h-[1.5px] text-slate-700" />
        </h1>

        <input
          type="email"
          placeholder="login as admin@gmail.com or create an account"
          name="email"
          onChange={handleChange}
          className="placeholder:text-slate-500 border p-2 w-full outline-none"
        />
        <input
          type="password"
          placeholder="1234"
          name="password"
          onChange={handleChange}
          className="placeholder:text-slate-500 border p-2 w-full outline-none"
        />

        <div className="flex justify-between w-full px-1">
          <span className="text-sm">Forgot password?</span>
          <Link to={"/signup"} className="text-sm">
            Create account
          </Link>
        </div>

        <button className="bg-black text-white py-2 px-8 cursor-pointer">
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
