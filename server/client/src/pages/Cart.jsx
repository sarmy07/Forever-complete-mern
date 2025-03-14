import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbMoodEmpty } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  addToCart,
  decreaseCart,
  getTotal,
  removeCart,
} from "./redux/features/cart/cartSlice";

export default function Cart() {
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  const handleQuantityChange = (e, cartItem) => {
    let newQuantity = parseInt(e.target.value);

    if (newQuantity > cartItem.cartQuantity) {
      dispatch(addToCart(cartItem));
      toast.info("Product increased in cart");
    } else if (newQuantity < cartItem.cartQuantity && newQuantity >= 1) {
      dispatch(decreaseCart(cartItem));
      toast.info("Product decreased from cart");
    }
  };

  const handleRemove = (cartItem) => {
    dispatch(removeCart(cartItem));
    toast.success("Product removed from cart");
  };

  return (
    <div className="mt-10 px-4 md:px-10">
      <h1 className="font-bold text-xl md:text-2xl flex items-center gap-2 mb-6">
        <span className="text-slate-500">YOUR</span> CART
        <hr className="w-10 h-[1.5px] text-slate-700 border" />
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-4">
            Your cart is empty
          </h3>
          <div className="flex flex-col justify-center items-center font-semibold gap-3">
            <TbMoodEmpty className="w-12 h-12 md:w-16 md:h-16 text-orange-500" />
            <Link to="/" className="flex items-center gap-2 text-blue-500">
              <FaLongArrowAltLeft className="h-5 w-5 md:h-6 md:w-6" />
              <span className="underline text-lg">Start shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.id}
              className="flex flex-wrap items-center gap-4 p-4 border-t border-slate-200"
            >
              {/* Product Image */}
              <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-md">
                <img
                  src={cartItem.images[0]}
                  alt={cartItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-[150px]">
                <p className="font-semibold text-base md:text-lg">
                  {cartItem.title}
                </p>
                <div className="text-gray-500 text-sm">
                  <span className="font-bold text-orange-500">
                    ${cartItem.price}
                  </span>
                  <span className="ml-3">{cartItem.category.name}</span>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  onChange={(e) => handleQuantityChange(e, cartItem)}
                  className="w-12 md:w-14 p-2 border border-slate-300 rounded-md text-center"
                />
              </div>

              {/* Remove Button */}
              <button className="text-red-500 hover:text-red-700">
                <FaRegTrashAlt
                  className="text-lg md:text-xl"
                  onClick={() => handleRemove(cartItem)}
                />
              </button>
            </div>
          ))}

          {/* Cart Totals */}
          <div className="w-full flex flex-col items-center md:items-end justify-end mt-10 md:mt-20">
            <div className="w-full md:w-1/2 flex flex-col gap-3 p-4 border border-slate-300 rounded-lg shadow-md">
              <h1 className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-bold">
                  <span className="text-slate-300">CART</span> TOTALS
                </span>
                <hr className="w-10 h-[1.5px] border" />
              </h1>

              <div className="border-t border-slate-300">
                <div className="flex justify-between items-center mt-5 text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">${cartTotalAmount}</span>
                </div>
              </div>

              <div className="w-full text-center md:text-end">
                <button className="capitalize bg-black text-white my-4 py-3 px-6 md:px-8 w-full md:w-auto rounded-md">
                  <Link to={"/checkout"}>Proceed to checkout</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
