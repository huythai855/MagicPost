import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/Modal/CustomModal";
import { useStateContext } from "../contexts/ContextProvider";
import FormTapKet from "../components/Forms/FormTapKet";
// import DiemTapKetData from "../data/DiemTapKetData.json";
import SortingTable from "../components/Table/SortingTable";

const DiemTapKet = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { isShowing, toggle } = useStateContext();
  const [diemTapKetData, setDiemTapKetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    // Close the modal when the form is submitted
    toggle();
  };
  // const diemTapKetData = DiemTapKetData;

  const API = "http://localhost:3001/api/departments";
  const deleteAPI = "http://localhost:3001/department/delete";
  useEffect(() => {
    const fetchData = async () => {
      var body = {
        type: 2,
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
          setDiemTapKetData(data);
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
      <div className="flex-col align-middle px-12 py-12 ">
        <button
          onClick={toggle}
          className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
        >
          Tạo điểm tập kết
        </button>
        <div>
          <SortingTable
            title={"Điểm tập kết"}
            dataSource={diemTapKetData}
            API={API}
            deleteAPI={deleteAPI}
            className="w-full"
          />
        </div>
      </div>
      <CustomModal
        isShowing={isShowing}
        title={"Tạo điểm tập kết"}
        hide={toggle}
        children={<FormTapKet onSubmit={handleFormSubmit} />}
      />
    </>
  );
};

export default DiemTapKet;
