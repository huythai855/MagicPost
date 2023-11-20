import React from "react";
import SortingTable from "../components/table/SortingTable";

const DiemTapKet = () => {
  return (
    <div className="flex-col ml-12 mt-12">
      <button
        type="button"
        className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
      >
        Tạo điểm tập kết
      </button>

      <SortingTable />
    </div>
  );
};

export default DiemTapKet;
