import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useGetProductsQuery,
} from "./redux/features/products/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/features/cart/cartSlice";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { data: product, isLoading, error, refetch } = useGetProductQuery(id);
  const { data: products } = useGetProductsQuery();
  const [mainImage, setMainImage] = useState(product?.images[0]);

  const dispatch = useDispatch();

  const relatedProducts = products?.filter(
    (p) =>
      p?.category.name === product?.category.name && p?._id !== product?._id
  );

  const handleAddToCart = async (product) => {
    if (!user) {
      return toast.error("login to add to cart");
    }
    try {
      dispatch(addToCart(product));
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMainImage(product?.images[0]);
    refetch();
  }, [product?.images, refetch]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start gap-5 w-full mt-16 px-3">
        <div className="w-full md:w-1/2 lg:w-1/3">
          {/* Main Image */}
          <div className="border border-gray-300 rounded overflow-hidden shadow-md">
            <img
              src={mainImage}
              alt={product?.title}
              className="w-full h-96 object-cover duration-300 ease-in-out hover:scale-105"
            />
          </div>

          {/* Smaller Images */}
          <div className="flex gap-2 mt-3">
            {product?.images.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImage(img)}
                className="h-20 w-20 md:w-24 md:h-24 object-cover border-2 border-gray-300 rounded cursor-pointer transition-all duration-200 ease-in-out hover:border-blue-500"
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/3 flex flex-col space-y-4 py-8">
          <h1 className="font-bold text-2xl">{product?.title}</h1>
          <p className="text-gray-700 text-md">{product?.description}</p>
          <p className="font-bold text-lg text-gray-700">
            {product?.category.name}
          </p>
          <p className="text-orange-500 text-2xl font-semibold">
            ${product?.price}
          </p>

          {(!user || user?.role === "user") && (
            <button
              onClick={() => handleAddToCart(product)}
              className="uppercase font-semibold bg-black text-white w-50 py-3 px-5 rounded cursor-pointer hover:shadow-lg"
            >
              Add to Cart
            </button>
          )}

          <hr className="mt-16 text-gray-400 w-3/4" />
          <p className="text-gray-500 text-sm">100% Original product</p>
          <p className="text-gray-500 text-sm">
            Cash on delivery is available on this product.
          </p>
          <p className="text-gray-500 text-sm">
            Easy return and exchange policy within 7 days.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="px-3 mt-20">
        {relatedProducts?.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-5 justify-center flex items-center gap-1">
              <span className="text-3xl text-gray-700 font-semibold">
                Related Products
              </span>
              <hr className="h-[1.5] text-gray-700 w-10" />
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts?.slice(0, 4).map((related) => (
                <Link
                  to={`/product/${related._id}`}
                  key={related._id}
                  className="flex flex-col gap-2"
                >
                  <div className="overflow-hidden">
                    <img
                      src={related?.images[0]}
                      alt={related?.title}
                      className="w-full hover:scale-110 transition-all ease-in-out rounded"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-700 text-sm">
                    {related?.title}
                  </h3>
                  <p className="font-bold text-orange-500">${related?.price}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
