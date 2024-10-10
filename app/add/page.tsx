"use client";
import uploadImageToCloudinary from "@/utils";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

interface FormData {
  name: string;
  image: File | null | string | undefined;
  description: string;
  category: string;
  price: number;
}

const page = () => {
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    category: "",
    price: 0,
    image: null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (formData.image instanceof File) {
      const objectUrl = URL.createObjectURL(formData.image);
      setPhotoPreview(objectUrl);

      // Clean up memory when the component unmounts or when the photo changes
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof formData.image === "string") {
      // If photo is a string (e.g., a URL from Cloudinary)
      setPhotoPreview(formData.image);
    } else {
      setPhotoPreview(undefined);
    }
  }, [formData.image]);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (e: any) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, image: data?.url });
  };
  return (
    <form className="mt-14 ml-10">
      <div className="flex flex-col">
        <div className="flex flex-col items-start mb-5">
          {/* <p className="pb-3 font-semibold">Upload image</p>{" "} */}
          <label htmlFor="customFile" className=" ">
            Upload image
          </label>
          {formData.image ? (
            <div className="h-[80px] w-[170px] bg-gray-100 flex flex-col justify-center items-center cursor-pointer">
              <img src={photoPreview} alt="" />
            </div>
          ) : (
            <div className="h-[80px] w-[170px] bg-gray-100 flex flex-col justify-center items-center cursor-pointer">
              <FaCloudUploadAlt className="text-5xl text-gray-400" />
              <p className="text-xs">Upload</p>
            </div>
          )}

          <input
            type="file"
            name="photo"
            id="customFile"
            accept=".jpg,.png"
             onChange={handleFileInputChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
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
          <button className="flex justify-center p-4 bg-black text-white w-[200px] ">
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
