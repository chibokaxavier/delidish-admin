"use client";
import uploadImageToCloudinary from "@/utils";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Toast } from "primereact/toast";

interface FormData {
  name: string;
  image: File | null | string | undefined;
  description: string;
  category: string;
  price: number;
}

const page = () => {
  const toast = useRef<Toast>(null);
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

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = (message: any) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };
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

  const url = "http://localhost:4000";

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (e: any) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, image: data?.url });
  };
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const res = await axios.post(`${url}/api/food/add`, formData);
    if (res.data.success) {
      showSuccess(res.data.message);
      setFormData({
        name: "",
        description: "",
        category: "",
        price: 0,
        image: null,
      });
    } else {
      showError(res.data.message);
    }
  };
  return (
    <form className="mt-14 ml-10" onSubmit={onSubmitHandler}>
      <Toast ref={toast} />
      <div className="flex flex-col">
        <div className="flex flex-col items-start mb-5 relative ">
          {/* <p className="pb-3 font-semibold">Upload image</p>{" "} */}
          <label htmlFor="customFile" className=" ">
            Upload image
          </label>
          {formData.image ? (
            <div className=" bg-gray-100 flex flex-col justify-center items-center cursor-pointer">
              <img src={photoPreview} alt="" className="h-[80px] w-[170px]" />
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
            required
            accept=".jpg,.png"
            onChange={handleFileInputChange}
            className="absolute  left-0 top-0 w-[170px] h-full opacity-0  cursor-pointer"
          />
        </div>
        <div>
          <div className="mb-5">
            <p className="form_label">Product name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Type here"
              className="form_input"
              required
            />
          </div>{" "}
        </div>
        <div className="mb-5">
          <p className="form_label">Product description</p>
          <textarea
            name="description"
            id=""
            rows={5}
            // value={formData.description}
            value={formData.description}
            placeholder="Write Content here"
            onChange={handleInputChange}
            required
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
                onChange={handleInputChange}
                required
                value={formData.category}
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
                onChange={handleInputChange}
                required
                value={formData.price}
                className="border-2 border-black w-[200px] h-[55px] px-2"
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <button
            type="submit"
            className="flex justify-center p-4 bg-black text-white w-[200px] "
          >
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
