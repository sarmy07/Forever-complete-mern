import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetOrderByUserQuery } from "./redux/features/order/orderApi";
import { TbCalendarSad } from "react-icons/tb";
import {FaLongArrowAltLeft} from 'react-icons/fa'

export default function MyOrders() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const { data: orders, isLoading, error } = useGetOrderByUserQuery(user?._id);

  return (
    <div className="container mx-auto p-4 mt-24">
      {orders?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-4xl font-semibold text-center mb-4">
            You currently have no orders
          </p>
          <TbCalendarSad className="text-orange-400 text-9xl" />
          <div className="mt-4">
            <Link to={"/"} className="flex items-center gap-2 text-blue-600">
              <FaLongArrowAltLeft className="text-2xl" />
              Start shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-semibold text-center mb-5">
            Orders
          </h2>
          <div className="overflow-x-auto relative ">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-black uppercase bg-gray-300 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr
                    key={order?._id}
                    className="bg-white border-b border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <Link to={`/order/${order?._id}`}>{order._id}</Link>
                    </th>
                    <td className="px-6 py-4">
                      $ {order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      className={`font-semibold ${
                        order.status === "pending"
                          ? "text-orange-400"
                          : order.status === "delivered"
                          ? "text-green-400"
                          : order.status === "canceled"
                          ? "text-red-500"
                          : order.status === "shipped"
                          ? "text-blue-400"
                          : "text-black"
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
