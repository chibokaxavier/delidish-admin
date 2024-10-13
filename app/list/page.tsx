"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";

const page = () => {
  const toast = useRef<Toast>(null);
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Error",
      life: 3000,
    });
  };
  const url = "http://localhost:4000";

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    console.log(res)
    if (res.data.success) {
      setList(res.data.data);
    } else {
      showError();
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div>
      <Toast ref={toast} />
    </div>
  );
};

export default page;
