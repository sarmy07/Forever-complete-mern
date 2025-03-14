import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "../../redux/features/products/productApi";

export default function Products() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  //   const [deleteProduct] = useDeleteProductMutation();
  // console.log(products);
  const initialVisibleCount = 10;
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const handleShowMore = () => {
    setVisibleCount(products?.length);
  };
  // console.log(products);

  //   const handleDelete = async (id) => {
  //     try {
  //       await deleteProduct(id).unwrap();
  //       refetch();
  //       toast.success("Product deleted!");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  if (isLoading) return <AiOutlineLoading3Quarters className="mx-auto" />;
  if (error) return <p>Error loading products</p>;
  return (
    <div className="overflow-x-scroll md:overflow-hidden">
      <div className="">
        <h1 className="font-bold text-lg">All Products</h1>

        <table className="min-w-full text-xs">
          <thead className="rounded-t-lg dark:bg-gray-300">
            <tr className="text-right">
              <th title="Ranking" className="p-3 text-left">
                #
              </th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              {/* <th className="p-3">Edit</th> */}
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products?.slice(0, visibleCount).map((product, index) => (
                <tr
                  key={index}
                  className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100"
                >
                  <td className="px-3 py-2 text-left">
                    <span>{index + 1}</span>
                  </td>
                  <td className="px-3 py-2 text-left">
                    <img src={product?.images[0]} className="w-5 h-5 rounded" alt="" />
                  </td>
                  <td className="px-3 py-2 text-left">
                    <Link
                      to={`/product/${product?._id}`}
                      className="cursor-pointer"
                    >
                      <span className="capitalize">{product?.title}</span>
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    <span>{product?.description.slice(0, 30)}...</span>
                  </td>
                  <td className="px-3 py-2">
                    <span>${product?.price}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span>{product?.category.name}</span>
                  </td>
                  {/* <td className="px-3 py-2 text-right ">
                    <Link to={`/admin/update-products/${product?._id}`}>
                      <button className=" cursor-pointer">
                        <MdModeEdit className="text-green-700 hover:text-green-500" />
                      </button>
                    </Link>
                  </td> */}
                  <td className="px-3 py-2 md:text-right md:flex justify-center items-start text-center">
                    <button
                      //   onClick={() => handleDelete(product?._id)}
                      className="cursor-pointer"
                    >
                      <MdDelete className="text-red-700 hover:text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {visibleCount < products?.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
