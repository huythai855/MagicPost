import React, { useState, useEffect } from "react";
import SortingTable from "../components/Table/SortingTable";
import TableDonHang from "../components/Table/TableDonHang";

import FormNhanVien from "../components/Forms/FormNhanVien";
import CustomModal from "../components/Modal/CustomModal";

import { useStateContext } from "../contexts/ContextProvider";
import FormTapKet from "../components/Forms/FormTapKet";
import FormDelete from "../components/Forms/FormDelete";
import { useNavigate } from "react-router-dom";
const DanhSachNgoaiKhu = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { isShowing, toggle } = useStateContext();
  const [donHangData, setDonHangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6570c47809586eff6641ea69.mockapi.io/donhang/donhang",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDonHangData(data);
        } else {
          setError("Error fetching data");
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const addDonHang = () => {
    // Thực hiện logic khác nếu cần
    // Chuyển hướng đến trang "/formbiennhan"
    navigate("./formbiennhan");
  };

  return (
    <>
      <div className="flex-col align-middle px-20 py-12 ">
        <button
          onClick={addDonHang}
          className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
        >
          Tạo đơn mới
        </button>

        <div>
          <TableDonHang
            title={"Đơn hàng ngoại khu"}
            dataSource={donHangData}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default DanhSachNgoaiKhu;
