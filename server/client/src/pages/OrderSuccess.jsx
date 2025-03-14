import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function OrderSuccess() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 mt-10">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 mb-8">
        <div className="flex justify-center items-center mb-4">
          <IoMdCheckmarkCircleOutline className="w-16 h-16 text-green-500" />
        </div>

        <h3 className="text-2xl font-bold text-center mb-4">
          Order Placed Successfully
        </h3>

        <p className="text-lg text-gray-600 text-center mb-4">
          Thank you for your order
        </p>

        <p className="text-lg text-gray-600 text-center mb-8">
          You can check the status of your order in your profile
        </p>
      </div>
    </div>
  );
}
