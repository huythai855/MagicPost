import React, { useState, useEffect } from "react";
import SortingTable from "../components/Table/SortingTable";
import FormNhanVien from "../components/Forms/FormNhanVien";
import CustomModal from "../components/Modal/CustomModal";

import { useStateContext } from "../contexts/ContextProvider";
import FormTapKet from "../components/Forms/FormTapKet";
import FormDelete from "../components/Forms/FormDelete";
import TableSelection from "../components/Table/TableSelection";
const DanhSachDonHangGDV = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { isShowing, toggle } = useStateContext();
  const [donHangData, setDonHangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  return (
    <>
      <div className="flex-col align-middle px-20 py-12 ">
        <button
          onClick={toggle}
          className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
        >
          Tạo đơn mới
        </button>
        <div>
          <TableSelection
            title={"Giao dịch viên"}
            dataSource={donHangData}
            className="w-full"
          />
        </div>
      </div>
      <CustomModal
        isShowing={isShowing}
        hide={toggle}
        children={<FormNhanVien />}
      />
    </>
  );
};

export default DanhSachDonHangGDV;
