import React, { useState, useEffect } from "react";
import SortingTable from "../components/Table/SortingTable";
import FormNhanVien from "../components/Forms/FormNhanVien";
import CustomModal from "../components/Modal/CustomModal";

import { useStateContext } from "../contexts/ContextProvider";
import FormTapKet from "../components/Forms/FormTapKet";
import FormDelete from "../components/Forms/FormDelete";
const DSNhanVien = ({ boss }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [department_id, setDepartment_id] = useState(
    localStorage.getItem("department_id")
  );

  const { isShowing, toggle } = useStateContext();
  const [nhanVienData, setNhanVienData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = "http://localhost:3001/employees";
  const deleteAPI = "http://localhost:3001/employees/delete";

  useEffect(() => {
    const fetchData = async () => {
      const body = {
        role: role,
        department_id: department_id,
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
          setNhanVienData(data);
        } else {
          setError("Error fetching data1");
        }
      } catch (error) {
        setError("Error fetching data2");
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
      <div className="flex-col align-middle px-16 py-12 ">
        <button
          onClick={toggle}
          className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
        >
          Tạo nhân viên
        </button>
        <div>
          <SortingTable
            title={"Nhân viên"}
            dataSource={nhanVienData}
            API={API}
            deleteAPI={deleteAPI}
            className="w-full"
          />
        </div>
      </div>
      {boss === "Giám đốc" && (
        <CustomModal
          isShowing={isShowing}
          hide={toggle}
          title={"Tạo nhân viên"}
          children={<FormNhanVien onSubmit={handleFormSubmit} boss={boss} />}
        />
      )}
      {boss === "Trưởng điểm tập kết" && (
        <CustomModal
          isShowing={isShowing}
          hide={toggle}
          title={"Tạo nhân viên"}
          children={<FormNhanVien onSubmit={handleFormSubmit} boss={boss} />}
        />
      )}
      {boss === "Trưởng điểm giao dịch" && (
        <CustomModal
          isShowing={isShowing}
          hide={toggle}
          title={"Tạo nhân viên"}
          children={<FormNhanVien onSubmit={handleFormSubmit} boss={boss} />}
        />
      )}
    </>
  );
};

export default DSNhanVien;
