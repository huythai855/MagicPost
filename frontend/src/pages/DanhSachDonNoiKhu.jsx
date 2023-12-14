import React, { useState, useEffect } from "react";
import SortingTable from "../components/Table/SortingTable";
import TableSelection from "../components/Table/TableSelection";

import FormNhanVien from "../components/Forms/FormNhanVien";
import CustomModal from "../components/Modal/CustomModal";

import { useStateContext } from "../contexts/ContextProvider";
import FormTapKet from "../components/Forms/FormTapKet";
import FormDelete from "../components/Forms/FormDelete";
const DanhSachDonNoiKhu = () => {
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
        <div>
          <SortingTable
            title={"Đơn hàng nội khu"}
            dataSource={donHangData}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
};

export default DanhSachDonNoiKhu;
