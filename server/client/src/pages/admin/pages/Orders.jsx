import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "../../redux/features/order/orderApi";
import UpdateOrderStatus from "./UpdateOrderStatus";

export default function Reviews() {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(orders);
  const [deleteOrder] = useDeleteOrderMutation();
  // console.log(orders);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id).unwrap();
      refetch();
      toast.success("Order deleted!");
    } catch (error) {
      toast.error("Error deleteing order");
      console.log(error);
    }
  };

  if (isLoading) return <AiOutlineLoading3Quarters className="mx-auto" />;
  if (error) return <div>Error loading orders</div>;
  return (
    <div className="container p-2 mx-auto rounded-md sm:p-4 ">
      <h2 className="mb-3 text-2xl font-semibold leading-tight">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="rounded-t-lg dark:bg-gray-300">
            <tr className="text-right">
              <th title="Ranking" className="p-3 text-left">
                #
              </th>

              <th title="Team name" className="p-3 text-left">
                Order ID
              </th>
              <th title="Wins" className="p-3">
                Price
              </th>
              <th title="Win percentage" className="p-3">
                Created At
              </th>
              <th title="Win percentage" className="p-3">
                Status
              </th>
              <th title="Win percentage" className="p-3">
                street
              </th>
              <th title="Win percentage" className="p-3">
                City
              </th>
              <th title="Win percentage" className="p-3">
                State
              </th>
              <th title="Games behind" className="p-3">
                Edit
              </th>
              <th title="Games behind" className="p-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders?.map((order, index) => (
                <tr
                  key={index}
                  className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100"
                >
                  <td className="px-3 py-2 text-left">
                    <span>{index + 1}</span>
                  </td>

                  <td className="px-3 py-2 text-left">
                    <Link to={`/order/${order?._id}`} className="capitalize">
                      {order?._id}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    <span>${order?.totalPrice}</span>
                  </td>

                  <td className="px-3 py-2">
                    <span>
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <span
                      className={`font-semibold
                        ${
                          order.status === "pending"
                            ? "text-orange-400"
                            : order.status === "delivered"
                            ? "text-green-700"
                            : order.status === "canceled"
                            ? "text-red-700"
                            : order.status === "shipped"
                            ? "text-blue-700"
                            : "text-black"
                        }`}
                    >
                      {order?.status}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <span>{order?.shippingAddress.street}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span>{order?.shippingAddress.city}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span>{order?.shippingAddress.state}</span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => handleEdit(order)}
                      className="cursor-pointer"
                    >
                      <MdModeEdit className="text-gray-500 hover:text-gray-900" />
                    </button>
                  </td>

                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => handleDelete(order?._id)}
                      className="cursor-pointer"
                    >
                      <MdDelete className="text-red-700 hover:text-red-900" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && setSelectedOrder && (
        <UpdateOrderStatus
          order={selectedOrder}
          onStatusUpdate={refetch}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
