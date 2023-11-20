import React from "react";
import SortingTable from "../components/table/SortingTable";

const DiemGiaoDich = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Tạo điểm giao dịch
        </button>
        <div className="flex justify-center">
          <SortingTable />
        </div>
      </div>
    </>
  );
};

export default DiemGiaoDich;
