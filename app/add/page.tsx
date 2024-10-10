"use client";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const page = () => {
  const [value, setValue] = useState("");
  return (
    <form className="mt-14 ml-10">
      <div className="flex flex-col">
        <div className="flex flex-col items-start mb-5">
          {" "}
          <p className="pb-3 font-semibold">Upload image</p>{" "}
          <div className="h-[80px] w-[170px] bg-gray-100 flex flex-col justify-center items-center cursor-pointer">
            <FaCloudUploadAlt className="text-5xl text-gray-400" />
            <p className="text-xs">Upload</p>
          </div>
        </div>
        <div>
          <div className="mb-5">
            <p className="form_label">Product name</p>
            <input
              type="text"
              name="name"
              // onChange={handleInputChange}
              placeholder="Type here"
              className="form_input"
            />
          </div>{" "}
        </div>
        <div className="mb-5">
          <p className="form_label">Product description</p>
          <textarea
            name="about"
            id=""
            rows={5}
            // value={formData.about}
            placeholder="Write Content here"
            // onChange={handleInputChange}
            className="form_input pt-2"
          ></textarea>
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-2 gap-5 mb-[30px]">
            <div>
              <p className="form_label">Product Category</p>
              <select
                name="category"
                id=""
                className="py-3.5 border-2 border-black w-[200px] px-5"
              >
                <option value="">Select</option>
                <option value="salad">Salad</option>
                <option value="rolls">Rolls</option>
                <option value="deserts">Deserts</option>
                <option value="sandwich">Sandwich</option>{" "}
                <option value="cake">Cake</option>{" "}
                <option value="pure veg">Pure Veg</option>
                <option value="pasta">Pasta</option>{" "}
                <option value="noodles">Noodles</option>{" "}
              </select>
            </div>

            <div>
              <p className="form_label"> Product Price</p>
              <input
                type="number"
                placeholder="100"
                name="price"
                className="border-2 border-black w-[200px] h-[55px] px-2"
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <button className="flex justify-center p-4 bg-black text-white w-[200px] ">ADD</button>
        </div>
      </div>
    </form>
  );
};

export default page;
