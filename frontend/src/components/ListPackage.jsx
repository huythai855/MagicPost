import { useState } from "react";
import DetailModal from "./Modal/DetailModal";
import { ChiTietDonHang } from "../pages";

const ListPackage = ({ packages }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  return (
    <>
      {packages.map((curList) => {
        const { id, sender, date, location, type, status } = curList;

        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{sender}</td>
            <td>{date}</td>
            <td>{location}</td>
            <td>{type}</td>
            <td>{status}</td>
            <td>
              <button
                onClick={() => {
                  setSelectedPackageId(id);
                  setOpenPopup(true);
                }}
                className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
              >
                Chi tiết
              </button>
            </td>
          </tr>
        );
      })}
      <DetailModal openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <ChiTietDonHang packageId={selectedPackageId} />
      </DetailModal>
    </>
  );
};
export default ListPackage;
