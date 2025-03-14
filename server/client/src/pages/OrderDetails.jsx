import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "./redux/features/order/orderApi";

export default function OrderDetails() {
  const { id } = useParams();
  const { data: order, isLoading, error } = useGetOrderQuery(id);
  // console.log(order);

  if (isLoading)
    return (
      <p className="flex justify-center items-center min-h-screen">
        Loading...
      </p>
    );
  if (error) return <p>Something went wrong!</p>;
  return (
    <div className="mt-28">
      {order && (
        <div className="max-w-4xl p-6 bg-white shadow">
          <h1 className="text-3xl font-bold mb-4">Order Details</h1>

          {/* Order Overview */}
          <div className="mb-6 border-t border-gray-400 pt-5">
            <p className="text-gray-700">
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Customer:</span>{" "}
              {order.user.username}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Amount:</span> $
              {order.totalPrice}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Pending"
                    ? "text-yellow-600"
                    : order.status === "Shipped"
                    ? "text-blue-500"
                    : order.status === "Cancelled"
                    ? "text-red-500"
                    : "text-black"
                } font-medium`}
              >
                {order.status}
              </span>
            </p>
          </div>

          {/* Order Items */}
          <h2 className="text-xl font-semibold mb-2">Order Items</h2>
          <ul className="divide-y divide-gray-200">
            {order?.orderItems.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <div>
                  <p className="text-gray-800 font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.cartQuantity}
                  </p>
                </div>
                <p className="text-gray-700">${item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
