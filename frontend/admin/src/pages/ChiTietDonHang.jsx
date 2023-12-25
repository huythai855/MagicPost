import React, { useState, useEffect } from "react";
import axios from "axios";

import QRCode from "qrcode.react";
import { green } from "@material-ui/core/colors";
import { useNavigate, useParams } from "react-router";
const API = "https://6586f3f1468ef171392f0aae.mockapi.io/detail";
const ChiTietDonHang = ({ packageId}) => {
  // State for form data
  // const [formData, setFormData] = useState([]);

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setFormData(data);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  // const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.put("https://6586f3f1468ef171392f0aae.mockapi.io/detail/" + packageId, formData)
  //   .then(res => {
  //     navigate('/shipper');
  //   })
  //   .catch(err => console.log(err))
  // }
  const [formData, setFormData] = useState({
    sender: "",
    status: "",
    // ... other fields
  });

  useEffect(() => {
    fetchData(`${API}/${packageId}`);
  }, [packageId]);
  useEffect(() => {
    fetchData(API);
  }, []);

  return (
    <div className="bg-gray-100 p-4 mx-20 mt-10 ">
      <form>
        <h2 className="mb-4  text-center text-2xl font-bold text-gray-900 dark:text-white">
          Chi tiết đơn hàng
        </h2>

        {formData ? <><div className="flex justify-end">
          <p className="text-md mr-10  text-gray-500 dark:text-gray-300  inline-block">
            {/* {ngay} / {thang} / {nam} */}
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
                  value={formData.sender}
                  disabled="true"
                />
              </div>

              <div className="sm:flex">
                <div className="md:col-span-2">
                  <label
                    htmlFor="province"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tỉnh
                  </label>

                  <input
                    name=""
                    disabled="true"
                    value={formData.senderpro}
                    id="province"
                    className="bg-gray-50 mr-28  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>

                <div className="md:ml-10 md:col-span-2">
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quận, huyện
                  </label>

                  <input
                    name=""
                    disabled="true"
                    value={formData.sendervil}
                    id="district"
                    className="bg-gray-50 mr-28   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // Other attributes
                  />
                </div>
              </div>

              <div className="w-90">
                <label
                  for="first_name"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="144 Xuan Thuy"
                  value={formData.senderlo}
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
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0987654343"
                  value={formData.senderphone}
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
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nguyen Van A"
                  value={formData.receiver}
                />
              </div>
              <div className="sm:flex">
                <div className="md:col-span-2">
                  <label
                    htmlFor="province"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tỉnh
                  </label>

                  <input
                    name=""
                    disabled="true"
                    value={formData.recpro}
                    id="province"
                    className="bg-gray-50 mr-28  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // Other attributes
                  />
                </div>

                <div className="md:ml-10 md:col-span-2">
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quận, huyện
                  </label>

                  <input
                    name=""
                    disabled="true"
                    value={formData.recvil}
                    id="district"
                    className="bg-gray-50 mr-28   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

                    // Other attributes
                  />
                </div>
              </div>
              <div className="w-90">
                <label
                  for="first_name"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="144 Xuan Thuy"
                  value={formData.reclo}
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
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0987654343"
                  value={formData.recphone}
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
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="quần áo"
                  value={formData.type}
                />
              </div>
              <div className="w-90">
                <label
                  for="first_name"
                  className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Khối lượng
                </label>
                <input
                  type="text"
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.5kg"
                  value={formData.klg}
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
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="30.000"
                  value={formData.total}
                />
              </div>
              <div className="w-90">
                <label
                  for="first_name"
                  className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Dịch vụ thêm
                </label>
                <input
                  disabled="true"
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.service}
                />
              </div>

              <div className="w-90">
                <label
                  for="first_name"
                  className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Người thanh toán cước
                </label>
                <input
                  disabled="true"
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.payer}
                />
              </div>
              <div className="w-100">
                <label
                  for="first_name"
                  className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Người tạo đơn
                </label>
                <input
                  type="text"
                  disabled="true"
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nguyen Van A"
                  value={formData.maker}
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
                // onChange={e => setFormData({...formData, status: e.target.value})}
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled value="" selected="selected">
                    {formData.status}
                  </option>
                  <option
                    value="Đang giao"
                    hidden={formData.status === "Đang giao"}
                  >
                    Đang giao
                  </option>
                  <option
                    value=""
                    hidden={formData.status === "Giao thành công"}
                  >
                    Giao thành công
                  </option>
                  <option
                    value="Giao thất bại"
                    hidden={formData.status === "Giao thất bại"}
                  >
                    Giao thất bại
                  </option>
                </select>
              </div>

              <div className="flex justify-end mt-40">
                <button
                  type="submit"
                  className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
                  disabled={!!(formData.status === "Giao thất bại" || formData.status === "Giao thành công")}
                  style = { ["Giao thất bại", "Giao thành công"].includes(formData.status) ? 
                  {
                    backgroundColor: 'gray'
                  } : {}}
                  
                >
                  Xác nhận
                </button>

                <button
                  //   type="submit"
                  className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
                >
                  Chỉ đường
                </button>
              </div>
            </div>
          </div>
        </div></> : <>Loading...</>}
        {/* Thông tin đơn hàng */}

        {/* Nút submit */}
      </form>
    </div>
  );
};

export default ChiTietDonHang;
