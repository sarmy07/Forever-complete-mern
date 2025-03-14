import React, { useState } from "react";
import { useCreateProductMutation } from "../../redux/features/products/productApi";
import { toast } from "react-toastify";

export default function AddProducts() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("clothes");
  const [price, setPrice] = useState("");

  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const handleImageChange = (e) => {
    setImages([...images, e.target.files[0]]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct({
        images,
        title,
        description,
        category,
        price,
      }).unwrap();
      console.log(res);
      toast.success("product added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <form
        className="flex flex-col gap-4 w-full items-start"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3 w-full">
          <p className="font-semibold">Upload Image</p>
          <div className="flex gap-2 items-center">
            {[1, 2, 3, 4].map((imageNum) => (
              <label htmlFor={`image${imageNum}`} key={imageNum}>
                <img
                  src="https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg"
                  alt={`Upload Image ${imageNum}`}
                  className="w-20 cursor-pointer"
                />
                <input
                  type="file"
                  id={`image${imageNum}`}
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="font-semibold">Product title</p>
          <input
            type="text"
            placeholder="type here.."
            className="w-full border border-gray-300 p-2 rounded outline-none flex-wrap md:w-[60%]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="font-semibold">Product description</p>
          <input
            type="text"
            placeholder="type description here.."
            className="w-full border outline-none border-gray-300 p-2 rounded flex-wrap md:w-[60%]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:gap-8 mt-5">
          <div className="flex flex-col gap-2">
            <p className="mb-2 font-semibold">Product Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 outline-none rounded"
            >
              <option value="clothes">Clothes</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="miscellaneous">Miscellaneous</option>
              <option value="shoes">Shoes</option>
              <option value="testing-category">Testing Category</option>
              <option value="string">Sting</option>
              <option value="category-b">Category_B</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold mb-2">Product Price</p>
            <input
              type="number"
              placeholder="25"
              className="border border-gray-300 px-3 py-2 outline-none rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white w-48 py-3 mt-4 font-semibold cursor-pointer"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
}
