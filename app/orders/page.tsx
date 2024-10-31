"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [orders, setOrders] = useState([]);
  const url = "http://localhost:4000";
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const fetchAllOrders = async () => {
    const res = await axios.get(url + "/api/order/list");
    if (res.data.success) {
      setOrders(res.data.data);
    }
  };

  const statusHandler = async (e: any, orderId: string) => {
    setIsUpdating(orderId); // Set loading state for specific order
    try {
      const res = await axios.post(url + "/api/order/status", {
        orderId,
        status: e.target.value,
      });
      if (res.data.success) {
       await fetchAllOrders();
        setIsUpdating(null);
        
      } else {
        setIsUpdating(null);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="mt-14 ml-10 my-10">
      <h3>Order Page</h3>
      <div>
        {orders.map((order: any, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 border mb-5 border-gray-300 p-4"
          >
            <img
              src="/parcel_icon.png"
              alt="parcel icon"
              className="w-12 h-12"
            />
            <div className=" p-2 ">
              <p className="font-semibold">
                {order.items.map((item: any, index: any) =>
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="font-semibold">
                {order.address.firstname} {order.address.lastname}
              </p>
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state}
              </p>
              <p>{order.address.phone}</p>
            </div>
            <p className=" p-2 ">Items: {order.items.length}</p>
            <p className=" p-2 ">${order.amount}</p>
            <select
              className="border border-black p-2  w-fit h-fit"
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              disabled={isUpdating === order._id}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
