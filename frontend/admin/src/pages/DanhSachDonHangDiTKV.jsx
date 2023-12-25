import React, { useState, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DetailModal from "../components/Modal/DetailModal";
import { ChiTietDonHangGDV, FormTapKet } from "../pages";
import ReactPaginate from "react-paginate";
import "./Shipper.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

// import 'bootstrap/dist/css/bootstrap.min.css'
const API = "https://6570c47809586eff6641ea69.mockapi.io/donhang/donhang";
const DanhSachDonHangDiTKV = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { isShowing, toggle } = useStateContext();
  const [donHangData, setDonHangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [packages, setPackage] = useState([]);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [search, setSearch] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length > 0) {
        setPackage(data);
      }
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData(API);
  }, []);
  const handleSendButtonClick = async (id) => {
    try {
      // Make an API request to update the status to "Đang giao"
      const response = await fetch(`${API}/${id}`, {
        method: "PUT", // Assuming your API supports updating via PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Đang giao" }),
      });

      if (!response.ok) {
        // Handle the case where the update was not successful
        console.error("Failed to update status");
        return;
      }

      // Update the local state to reflect the change
      const updatedPackages = packages.map((pkg) =>
        pkg.id === id ? { ...pkg, status: "Đang giao" } : pkg
      );
      setPackage(updatedPackages);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  const handleConfirmButtonClick = async (id) => {
    try {
      // Make an API request to update the status to "Hoàn thành"
      const response = await fetch(`${API}/${id}`, {
        method: "PUT", // Assuming your API supports updating via PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Hoàn thành" }),
      });

      if (!response.ok) {
        // Handle the case where the update was not successful
        console.error("Failed to update status");
        return;
      }

      // Update the local state to reflect the change
      const updatedPackages = packages.map((pkg) =>
        pkg.id === id ? { ...pkg, status: "Hoàn thành" } : pkg
      );
      setPackage(updatedPackages);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(packages.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(packages.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, packages]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % packages.length;
    setItemOffset(newOffset);
  };

  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...packages].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setPackage(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...packages].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setPackage(sorted);
      setSortOrder("ASC");
    }
  };

  const sortingnum = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...packages].sort((a, b) =>
        parseInt(a[col]) > parseInt(b[col]) ? 1 : -1
      );
      setPackage(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...packages].sort((a, b) =>
        parseInt(a[col]) < parseInt(b[col]) ? 1 : -1
      );
      setPackage(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <>
      <Form>
        <InputGroup>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm đơn hàng"
            className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </InputGroup>
      </Form>
      <table>
        <thead>
          <tr>
            <th>
              ID <FaSort onClick={() => sortingnum("id")} />
            </th>
            <th>
              Mã đơn hàng <FaSort onClick={() => sorting("maDonHang")} />
            </th>
            <th>
              Nơi gửi <FaSort onClick={() => sorting("fullName")} />
            </th>
            <th>
              Ngày gửi <FaSort onClick={() => sorting("date")} />
            </th>
            <th>
              Điểm nhận <FaSort onClick={() => sorting("address")} />
            </th>
            <th>
              Loại hàng <FaSort onClick={() => sorting("typeOfGoods")} />
            </th>
            <th>
              Trạng thái <FaSort onClick={() => sorting("status")} />
            </th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems
            .filter((curList) => {
              return search.toLowerCase() === ""
                ? curList
                : curList.sender.toLowerCase().includes(search);
            })
            .map((curList) => {
              const {
                id,
                maDonHang,
                fullName,
                date,
                address,
                typeOfGoods,
                status,
              } = curList;

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{maDonHang}</td>
                  <td>{fullName}</td>
                  <td>{date}</td>
                  <td>{address}</td>
                  <td>{typeOfGoods}</td>
                  <td>{status}</td>
                  <td>
                    {status === "Chờ gửi" ? (
                      <button
                        onClick={() => {
                          setSelectedPackageId(id);
                          setOpenPopup(true);
                        }}
                        className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
                      >
                        Gửi hàng
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConfirmButtonClick(id)}
                        disabled={
                          status !== "Giao thành công" &&
                          status !== "Giao thất bại"
                        }
                        className={`focus:outline-none text-white ${
                          status === "Giao thành công" ||
                          status === "Giao thất bại"
                            ? "bg-buttonCreate"
                            : "bg-gray-500"
                        } hover: focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
                          status === "Giao thành công" ||
                          status === "Giao thất bại"
                            ? ""
                            : "cursor-not-allowed"
                        } dark:${
                          status === "Giao thành công" ||
                          status === "Giao thất bại"
                            ? "bg-green-600"
                            : "bg-gray-500"
                        } dark:hover:bg-green-700 dark:focus:ring-green-800 fl`}
                      >
                        Xác nhận
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          <DetailModal openPopup={openPopup} setOpenPopup={setOpenPopup}>
            <FormTapKet packageId={selectedPackageId} />
          </DetailModal>
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
      />
    </>
  );
};

export default DanhSachDonHangDiTKV;
