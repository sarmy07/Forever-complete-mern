import React from "react";
import { useGetProductsQuery } from "../../pages/redux/features/products/productApi";
import { Link } from "react-router-dom";

export default function BestSellers() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  //   console.log(products);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="flex items-center justify-center min-h-screen">Error: {error.data}</div>;
  return (
    <div className="px-3 mt-20 w-full">
      <div className="flex flex-col justify-center w-full mb-20">
        <span className="flex items-center mx-auto gap-1">
          <h1 className="text-2xl md:text-3xl text-center uppercase font-semibold text-gray-800">
            <span className="text-gray-500">Best</span> Sellers
          </h1>
          <hr className="h-[2.0px] w-6 md:w-10 bg-gray-700" />
        </span>

        <p className="mx-auto text-sm px-10 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          natus, qui iste aliquid ducimus porro unde consequuntur
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
        {products?.slice(16, 24).map((product) => (
          <Link
            to={`/product/${product._id}`}
            className="flex flex-col gap-3 text-gray-700"
            key={product._id}
          >
            <div className="overflow-hidden">
              <img
                className="w-full hover:scale-110 transition ease-in-out"
                src={product.images[0]}
                alt={product.title}
              />
            </div>
            <div className="">
              <p className="font-semibold text-gray-700 text-sm">
                {product.title}
              </p>
              <p className="font-semibold text-gray-900 text-sm">
                {product.category.name}
              </p>
              <p className="font-bold text-orange-400">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
