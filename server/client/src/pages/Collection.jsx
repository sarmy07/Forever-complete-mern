import React, { useState } from "react";
import { useGetProductsQuery } from "../pages/redux/features/products/productApi";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function Collection() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  //   console.log(products);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  let filteredProducts =
    products?.filter((product) => product.category.name.toLowerCase()) || [];

  if (sortOrder === "low-to-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-to-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  if (selectedCategory.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategory.includes(product.category.name.toLowerCase())
    );
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="mx-auto container p-3 border-t border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 md:gap-4 w-full mt-10">
        {/* left */}
        <div className="w-full sm:w-2/5 md:w-1/5 flex flex-col space-y-4">
          <span className="flex gap-2 items-center mb-2">
            <h1 className="font-semibold text-xl">FILTERS</h1>
            <span
              className="md:hidden flex text-slate-300 cursor-pointer"
              onClick={toggleFilter}
            >
              {showFilter ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </span>

          <div
            className={`md:flex flex-col gap-4 ${
              showFilter ? "flex" : "hidden"
            }`}
          >
            <div className="border border-gray-200 p-4">
              <h3 className="font-semibold">CATEGORIES</h3>

              <div className="flex flex-col gap-2 mt-4 text-sm">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("clothes")}
                    onChange={() => handleCategoryChange("clothes")}
                  />
                  <span>Clothes</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("electronics")}
                    onChange={() => handleCategoryChange("electronics")}
                  />
                  <span>Electronics</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("furniture")}
                    onChange={() => handleCategoryChange("furniture")}
                  />
                  <span>Furniture</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("shoes")}
                    onChange={() => handleCategoryChange("shoes")}
                  />
                  <span>Shoes</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("miscellaneous")}
                    onChange={() => handleCategoryChange("miscellaneous")}
                  />
                  <span>Miscellaneous</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("testing-category")}
                    onChange={() => handleCategoryChange("testing-category")}
                  />
                  <span>Testing Category</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("string")}
                    onChange={() => handleCategoryChange("string")}
                  />
                  <span>String</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes("category_b")}
                    onChange={() => handleCategoryChange("category_b")}
                  />
                  <span>category_B</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 p-4">
              <h3 className="font-semibold">SORT BY PRICE</h3>

              <div className="flex flex-col gap-2 mt-4 text-sm">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="low-to-high"
                    value="low-to-high"
                    checked={sortOrder === "low-to-high"}
                    onChange={() => handleSortChange("low-to-high")}
                  />
                  <span>Low to High</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id="high-to-low"
                    value="high-to-low"
                    checked={sortOrder === "high-to-low"}
                    onChange={() => handleSortChange("high-to-low")}
                  />
                  <span>High to Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-full">
          <h1 className="flex items-center gap-1">
            <span className="font-semibold text-md md:text-xl pl-4">
              <span className="text-gray-500">ALL</span> COLLECTIONS
            </span>
            <hr className="w-8 bg-slate-700" />
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
            {filteredProducts.map((product) => (
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
                  <p className="font-semibold text-gray-600 text-sm">
                    {product.title}
                  </p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {product.category.name}
                  </p>
                  <p className="font-bold text-orange-500">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
