import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../redux/features/user/userApi";
import { logout } from "../redux/features/user/userSlice";
import { GrUserAdmin } from "react-icons/gr";

export default function AdminNavigation() {
  //   const { user } = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logout success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-5 md:h-[calc(100vh-98px)] p-8 flex flex-col justify-between">
      <div>
        <div className="text-5xl cursor-pointer flex justify-start relative my-3">
          <GrUserAdmin />
        </div>
        <hr className=" border-gray-300 border mt-4" />

        <ul className="space-y-5 mt-5">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              to="/admin/Add-new-product"
            >
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              end
              to="/admin/products"
            >
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
              to="/admin/orders"
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        {/* <hr /> */}
        <button
          onClick={handleLogout}
          className="bg-red-500 font-semibold mt-5 px-5 py-3 text-white rounded-sm w-full hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
