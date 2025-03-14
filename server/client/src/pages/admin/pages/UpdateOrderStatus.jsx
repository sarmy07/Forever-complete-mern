import React, { useState } from "react";
import { useUpdateOrderStatusMutation } from "../../redux/features/order/orderApi";
import { toast } from "react-toastify";
import { BsExclamationCircle } from "react-icons/bs";

export default function UpdateOrderStatus({ order, onStatusUpdate, onClose }) {
  const [status, setStatus] = useState(order.status);
  const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await updateOrderStatus({ id: order._id, status }).unwrap();
      onStatusUpdate();
      onClose();
      toast.success("Order status updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="bg-black/30 bg-opacity-30 inset-0 backdrop-blur-sm fixed flex justify-center items-center">
      <div className="bg-white max-w-sm p-6 w-full rounded">
        <BsExclamationCircle className="mx-auto size-12 mb-5" />
        <h2 className="text-xl font-semibold mb-4 text-center">
          Are you sure you want to update order status?
        </h2>

        <select
          className="w-full block p-2 border border-gray-300 rounded mb-4 outline-none"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>

        <div className="flex justify-between mt-5">
          <button
            onClick={handleSubmit}
            className={`py-2 px-4 rounded cursor-pointer ${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 text-white"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
