"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FaTrash } from "react-icons/fa";
import { Skeleton, Spinner } from "@nextui-org/react";

interface food {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  category: number;
}

const page = () => {
  const toast = useRef<Toast>(null);
  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Error",
      life: 3000,
    });
  };
  const url = "http://localhost:4000";

  const [list, setList] = useState<food | any>([]);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    const res = await axios.get(`${url}/api/food/list`);
    if (res.data.success) {
      setList(res.data.data);
      setLoading(false);
    } else {
      showError();
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId: string) => {
    setDeleting(true);
    const res = await axios.post(`${url}/api/food/delete`, { id: foodId });
    if (res.data.success) {
      showSuccess(res.data.message);
      await fetchList();
      setDeleting(false);
    } else {
      showError();
      setDeleting(false);
    }
  };
  return (
    <div className="mt-14 ml-10">
      <Toast ref={toast} />
      <p className="font-semibold text-3xl ml-5  mb-5">
        All food list ({list?.length}){" "}
      </p>
      <div className="grid grid-cols-10 gap-4 px-4 py-3 text-lg font-semibold border w-[1100px] ">
        <div className="col-span-2">Image</div>
        <div className="col-span-2">Name</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Action</div>
      </div>
      {loading ? (
        <div className="flex gap-4 px-4 py-3 border items-center w-[1100px] ">
          <Skeleton className=" size-[60px] rounded-md" />
          <Skeleton className=" h-[30px] w-[250px] mx-2  rounded-md" />
          <Skeleton className=" h-[30px] w-[250px]  rounded-md" />{" "}
          <Skeleton className=" h-[30px] w-[250px] mx-2 rounded-md" />{" "}
          <Skeleton className=" h-[30px] w-[250px]  rounded-md" />
        </div>
      ) : (
        <div>
          {list?.map((item: food, i: number) => {
            return (
              <div
                key={i}
                className="grid grid-cols-10 gap-4 px-4 py-3 border items-center "
              >
                <img
                  className="col-span-2 size-[60px]"
                  src={item.image}
                  alt=""
                />
                <p className="capitalize col-span-2">{item.name}</p>
                <p className="capitalize col-span-2">{item.category}</p>
                <p className="col-span-2">${item.price}</p>
                <p
                  className="col-span-2 cursor-pointer"
                  onClick={() => removeFood(item._id)}
                >
                  {" "}
                  {deleting ? (
                    <Spinner
                      size="sm"
                      className="text-blue-900"
                      color="secondary"
                    />
                  ) : (
                    <FaTrash className="text-lg text-red-600" />
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default page;
