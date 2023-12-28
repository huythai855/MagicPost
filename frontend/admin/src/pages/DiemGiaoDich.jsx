import React, { useState, useEffect } from "react";
import SortingTable from "../components/Table/SortingTable";
import FormGiaoDich from "../components/Forms/FormGiaoDich";
import CustomModal from "../components/Modal/CustomModal";
import { useStateContext } from "../contexts/ContextProvider";
import FormTapKet from "../components/Forms/FormTapKet";
import FormDelete from "../components/Forms/FormDelete";
const DiemGiaoDich = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { isShowing, toggle } = useStateContext();
  const [diemGiaoDichData, setDiemGiaoDichData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = "http://localhost:3001/api/departments";
  const deleteAPI = "http://localhost:3001/department/delete";
  useEffect(() => {
    const fetchData = async () => {
      var body = {
        type: 1,
      };
      try {
        const response = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
          setDiemGiaoDichData(data);
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
  const handleFormSubmit = () => {
    // Close the modal when the form is submitted
    toggle();
  };
  return (
    <>
      <div className="flex-col align-middle px-12 py-12 ">
        <button
          onClick={toggle}
          className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
        >
          Tạo điểm giao dịch
        </button>
        <div>
          <SortingTable
            title={"Điểm giao dịch"}
            dataSource={diemGiaoDichData}
            deleteAPI={deleteAPI}
            API={API}
            className="w-full"
          />
        </div>
      </div>
      <CustomModal
        isShowing={isShowing}
        hide={toggle}
        title={"Tạo điểm giao dịch"}
        children={<FormGiaoDich onSubmit={handleFormSubmit} />}
      />
    </>
  );
};

export default DiemGiaoDich;
