import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTotal } from "./redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "./redux/features/order/orderApi";
import { toast } from "react-toastify";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const cartTotalQuantity = useSelector(
    (state) => state.cart.cartTotalQuantity
  );

  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // console.log(shippingAddress);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      orderItems: cartItems,
      shippingAddress,
      totalPrice: cartTotalAmount,
    };

    const isEmptyField = Object.values(shippingAddress).some(
      (value) => !value.trim()
    );
    if (isEmptyField) {
      return toast.error("Please fill out all shipping details");
    }

    try {
      const res = await createOrder(orderData).unwrap();
      toast.success("order placed");
      console.log(res);
      navigate("/order-success");
    } catch (error) {
      console.log(error);
      toast.error(error.data);
    }
  };

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-bold flex items-center gap-2 text-2xl">
          <span className="text-gray-400">DELIVERY</span> INFORMATION{" "}
          <hr className="w-10 h-[1.5px] border" />
        </h1>

        <div className="w-full flex flex-col md:flex-row items-center mt-10 gap-8 md:gap-4">
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            {/* shipping info */}
            <div className="flex w-full gap-2">
              <input
                type="text"
                placeholder="First name"
                name="firstname"
                onChange={handleChange}
                className="border p-2 w-1/2 border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Last name"
                name="lastname"
                onChange={handleChange}
                className="border p-2 w-1/2 border-gray-300 rounded"
              />
            </div>

            <input
              type="text"
              placeholder="Email address"
              name="email"
              onChange={handleChange}
              className="border p-2 border-gray-300 rounded"
            />

            <input
              type="text"
              placeholder="Street"
              name="street"
              onChange={handleChange}
              className="border p-2 border-gray-300 rounded"
            />

            <div className="flex w-full gap-2">
              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={handleChange}
                className="border p-2 w-1/2 border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="State"
                name="state"
                onChange={handleChange}
                className="border p-2 w-1/2 border-gray-300 rounded"
              />
            </div>

            <div className="flex w-full gap-2">
              <input
                type="number"
                placeholder="Zipcode"
                name="zipcode"
                onChange={handleChange}
                className="border p-2 w-1/2 border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Country"
                name="country"
                onChange={handleChange}
                className="border p-2 w-1/2 border-gray-300 rounded"
              />
            </div>
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              className="border p-2 border-gray-300 rounded"
            />
          </div>

          <div className="w-full md:w-1/2  p-6 rounded-lg ">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
              Order Summary
            </h2>

            {cartItems.length > 0 ? (
              <ul className="space-y-3">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">{item.title}</span>
                      <span className="block text-gray-500 text-xs">
                        Qty: {item.cartQuantity}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      ${item.price * item.cartQuantity}
                    </span>
                  </li>
                ))}

                <hr className="border-gray-300 my-2" />

                <li className="flex justify-between font-medium text-gray-700">
                  <span>Total Items:</span>
                  <span>{cartTotalQuantity}</span>
                </li>
                <li className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${cartTotalAmount.toFixed(2)}</span>
                </li>
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty</p>
            )}

            {cartItems.length > 0 && (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full mt-4 bg-black text-white py-4 rounded text-sm font-medium hover:bg-gray-900 transition uppercase cursor-pointer"
              >
                {isLoading ? "Loading" : " Place Order"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
