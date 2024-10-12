import React, { useState, useEffect } from "react";
import axios from "axios";

import QRCode from "qrcode.react";
import { green } from "@material-ui/core/colors";
import { useNavigate, useParams } from "react-router";
// const API = "http://localhost:3001/item/don_noi_khu";
const url2 = "http://localhost:3001/item/update";



const ChiTietDonHangGDV = (urltruyen, packageId) => {
  packageId = urltruyen.packageId;
  urltruyen = urltruyen.urltruyen;
  var department_id = localStorage.getItem("department_id");
  console.log("ok:",urltruyen);
  var username = localStorage.getItem("username");
  console.log(12345);
  console.log(packageId);

  const fetchData = async (urltruyen) => {
    try {
      const res = await fetch(urltruyen, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department_id: department_id,
        }),
      });

      const data = await res.json();

      console.log("data", data);
      

      // packageId = packageId.packageId;

      for (var row of data) {
        console.log("role", row.id);
        console.log("package",packageId);
        if (row.id === packageId) {
          setFormData(row);
          console.log(formData);
          console.log(12345667);
          break;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const [formData, setFormData] = useState([]);

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmid clicked");
    const body = {
      status: selectedStatus,
      id: packageId,
      username: username,
    };
    try {
      const response = await axios.post(url2, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  useEffect(() => {
    fetchData(urltruyen, packageId);
  }, [urltruyen, packageId]);

  useEffect(() => {
    fetchData(urltruyen);
  }, []);
  const d = new Date();
  const ngay = d.getDate();
  const thang = d.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0, nên cần cộng thêm 1
  const nam = d.getFullYear();
  return (
    <div className="bg-gray-100 p-4 mb-10 ">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4  text-center text-2xl font-bold text-gray-900 dark:text-white">
          Chi tiết đơn hàng
        </h2>

        {formData ? (
          <>
            <div className="flex justify-end">
              <p className="text-md mr-10  text-gray-500 dark:text-gray-300  inline-block">
                {ngay} / {thang} / {nam}
              </p>
              <QRCode
                className=" inline-block"
                size={70} // Kích thước của QR code
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                {/* Thông tin người gửi */}

                <h3 className="mb-4 text-center text-rg font-bold text-gray-900 dark:text-white">
                  Thông tin người gửi
                </h3>
                <div className="max-w-content mx-auto mx-20">
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Họ và tên:
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nguyen Van A"
                      value={formData.sender_name}
                    />
                  </div>
                  <div className="sm:flex"></div>

                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Địa chỉ:
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="144 Xuan Thuy"
                      value={formData.sender_address}
                    />
                  </div>
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0987654343"
                      value={formData.sender_tel_number}
                    />
                  </div>
                </div>

                {/* Thông tin người nhận */}
                <h3 className="mb-4 text-center text-rg font-bold text-gray-900 dark:text-white">
                  Thông tin người nhận
                </h3>
                <div className="max-w-content mx-auto mx-20">
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Họ và tên:
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nguyen Van A"
                      value={formData.receiver_name}
                    />
                  </div>
                  <div className="sm:flex"></div>
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Địa chỉ:
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="144 Xuan Thuy"
                      value={formData.receiver_address}
                    />
                  </div>
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0987654343"
                      value={formData.receiver_tel_number}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-center text-rg font-bold text-gray-900 dark:text-white">
                  Thông tin đơn hàng
                </h3>
                <div className="max-w-content mx-auto mx-20">
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Loại hàng
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="quần áo"
                      value={formData.type_of_good}
                    />
                  </div>
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Khối lượng (kg)
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.5kg"
                      value={formData.weight}
                    />
                  </div>
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tổng cước
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="30.000"
                      value={formData.cost}
                    />
                  </div>
                  <div className="w-90">
                    <label
                      for="first_name"
                      className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Trạng thái
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={handleChange}
                      className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled value="" selected="selected">
                        {formData.stage}
                      </option>
                      <option
                        value="chờ gửi"
                        hidden={formData.stage === "chờ gửi"}
                      >
                        chờ gửi
                      </option>
                      <option
                        value="đang giao"
                        hidden={formData.stage === "đang giao"}
                      >
                        đang giao
                      </option>
                      <option
                        value=" hoàn thành"
                        hidden={formData.stage === " hoàn thành"}
                      >
                        hoàn thành
                      </option>
                   
                    </select>
                  </div>

                  <div className="flex justify-end mt-40">
                    <button
                      type="submit"
                      className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
                      disabled={
                        !!(
                          formData.stage === "giao thất bại" ||
                          formData.stage === "giao thành công"
                        )
                      }
                      style={
                        ["giao thất bại", "giao thành công"].includes(
                          formData.stage
                        )
                          ? {
                              backgroundColor: "gray",
                            }
                          : {}
                      }
                    >
                      Xác nhận
                    </button>

                   
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>Loading...</>
        )}
      </form>
    </div>
  );
};

export default ChiTietDonHangGDV;
