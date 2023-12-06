import React, { useState } from "react";
import SortingTable from "../components/Table/SortingTable";
import FormGiaoDich from "../components/Forms/FormGiaoDich";
import CustomModal from "../components/Modal/CustomModal";
import { useStateContext } from "../contexts/ContextProvider";
import FormTapKet from "../components/Forms/FormTapKet";
import FormDelete from "../components/Forms/FormDelete";
const DanhSachDonHang = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { isShowing, toggle } = useStateContext();
  return (
    <>
      <div className="flex-col align-middle px-20 py-12 ">
        <button
          onClick={toggle}
          className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
        >
          Tạo điểm giao dịch
        </button>
        <div>
          <SortingTable className="w-full" />
        </div>
      </div>
      <CustomModal
        isShowing={isShowing}
        hide={toggle}
        children={<FormGiaoDich />}
      />
    </>
  );
};

export default DanhSachDonHang;
