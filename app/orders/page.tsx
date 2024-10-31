"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [orders, setOrders] = useState([]);
  const url = "http://localhost:4000";

  const fetchAllOrders = async () => {
    const res = await axios.get(url + "/api/order/list");
    if (res.data.success) {
      setOrders(res.data.data);
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
          <div key={index} className="grid grid-cols-5 gap-4 border mb-5 border-gray-300 p-4">
            <img src="/parcel_icon.png" alt="parcel icon" className="w-12 h-12" />
            <div className=" p-2 ">
              <p>
                {order.items.map((item: any, index: any) =>
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>{order.address.firstname} {order.address.lastname}</p>
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state}</p>
              <p>{order.address.phone}</p>
            </div>
            <p className=" p-2 ">Items: {order.items.length}</p>
            <p className=" p-2 ">${order.amount}</p>
            <select className="border border-black p-2  w-fit h-fit">
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
