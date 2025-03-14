import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { LiaTimesSolid } from "react-icons/lia";
import { AiOutlineShopping } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useGetProductsQuery } from "../pages/redux/features/products/productApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../pages/redux/features/user/userSlice";
import { useLogoutUserMutation } from "../pages/redux/features/user/userApi";
import { toast } from "react-toastify";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchBar, setSearchbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: products } = useGetProductsQuery();
  const { user } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchBar = () => {
    setSearchbar(!searchBar);
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <div className="flex justify-between items-center py-5 relative">
        <h1 className="font-bold uppercase text-4xl">
          <Link to={"/"}>Forever</Link>
        </h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-5 text-sm">
          <NavLink
            to={"/"}
            className="flex flex-col gap-1 items-center text-gray-700"
          >
            <p className="font-semibold">HOME</p>
            <hr className="w-8 h-[1.5px] text-gray-700 hidden border" />
          </NavLink>
          <NavLink
            to={"/collection"}
            className="flex flex-col gap-1 items-center text-gray-700"
          >
            <p className="font-semibold">COLLECTION</p>
            <hr className="w-8 h-[1.5px] text-gray-700 hidden border" />
          </NavLink>
          <NavLink
            to={"/about"}
            className="flex flex-col gap-1 items-center text-gray-700"
          >
            <p className="font-semibold">ABOUT</p>
            <hr className="w-8 h-[1.5px] text-gray-700 hidden border" />
          </NavLink>
          <NavLink
            to={"/contact"}
            className="flex flex-col gap-1 items-center text-gray-700"
          >
            <p className="font-semibold">CONTACT</p>
            <hr className="w-8 h-[1.5px] text-gray-700 hidden border" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <span className="cursor-pointer" onClick={toggleSearchBar}>
            <IoIosSearch className="h-7 w-7" />
          </span>

          {searchBar && (
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md p-3 w-80">
              <input
                type="text"
                className="w-full p-2 border border-gray-200 rounded outline-none"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="mt-2 max-h-40 overflow-y-auto">
                {filteredProducts?.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <div>
                        <img
                          src={product.images[0]}
                          alt=""
                          className="w-8 h-8 rounded"
                        />
                      </div>
                      <span className="text-gray-900 text-sm">
                        {product.title}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No products found</p>
                )}
              </div>
            </div>
          )}

          {/* User Dropdown */}
          {user ? (
            <div className="group relative cursor-pointer">
              <span
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="md:cursor-pointer"
              >
                <FiUser className="w-7 h-7 text-slate-700" />
              </span>
              <div
                className={`absolute right-0 bg-white shadow-md rounded-md w-40 py-2 text-gray-800
              md:group-hover:block ${
                isDropdownOpen ? "block" : "hidden"
              } md:hidden`}
              >
                <div className="flex flex-col gap-2 text-gray-800 p-3">
                  <p className="font-bold text-sm">{user?.email}</p>

                  {/* Admin */}
                  {user?.role === "admin" ? (
                    <>
                      <Link
                        to="/admin/products"
                        className="text-sm text-semibold bg-blue-400 justify-center flex py-1 text-white hover:scale-105 hover:text-bold transition-all duration-200 ease-in-out"
                      >
                        Admin
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* regular user */}
                      <Link
                        to={`/order/user/${user?._id}`}
                        className="text-sm hover:font-semibold"
                      >
                        Orders
                      </Link>
                      <p
                        onClick={handleLogout}
                        className="text-sm hover:font-semibold cursor-pointer"
                      >
                        Logout
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Link to={"/login"} className="group relative">
              <span>
                <FiUser className="w-7 h-7 text-slate-700" />
              </span>
            </Link>
          )}

          {/* Cart Icon */}
          {!user ||
            (user.role === "user" && (
              <Link to={"/cart"} className="relative">
                <AiOutlineShopping className="h-7 w-7 text-slate-700" />
                <span className="absolute bg-black text-white p-2 rounded-full h-5 w-5 flex justify-center items-center left-3 -top-2">
                  {cartTotalQuantity}
                </span>
              </Link>
            ))}

          {/* Mobile Menu */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? (
              <LiaTimesSolid className="h-8 w-8" />
            ) : (
              <BiMenuAltRight className="h-8 w-8" />
            )}
          </div>

          {/* Mobile Navigation Menu */}
          <ul
            className={`md:hidden fixed top-0 left-0 w-full h-screen z-50 bg-white flex flex-col justify-center items-center transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 p-4">
              {" "}
              {/* Absolute positioning for top-right */}
              <button
                className="border-2 text-slate-600 rounded-full p-1 cursor-pointer"
                onClick={toggleMenu}
              >
                <LiaTimesSolid className="h-5 w-5 font-bold" />
              </button>
            </div>

            {/* Navbar */}
            <nav className="flex flex-col justify-center items-center gap-3 text-lg">
              <NavLink
                to={"/"}
                onClick={toggleMenu}
                className="font-semibold text-gray-700 hover:scale-110 ease-in-out transition"
              >
                HOME
              </NavLink>
              <NavLink
                to={"/collection"}
                onClick={toggleMenu}
                className="font-semibold text-gray-700 hover:scale-110 ease-in-out transition"
              >
                COLLECTION
              </NavLink>
              <NavLink
                to={"/about"}
                onClick={toggleMenu}
                className="font-semibold text-gray-700 hover:scale-110 ease-in-out transition"
              >
                ABOUT
              </NavLink>
              <NavLink
                to={"/contact"}
                onClick={toggleMenu}
                className="font-semibold text-gray-700 hover:scale-110 ease-in-out transition"
              >
                CONTACT
              </NavLink>
            </nav>
          </ul>
        </div>
      </div>
    </div>
  );
}
