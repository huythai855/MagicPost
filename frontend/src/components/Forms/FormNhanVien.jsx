import React, { useState, useEffect } from "react";
import axios from "axios";

const FormGiaoDich = () => {
  const host = "https://provinces.open-api.vn/api/";

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Fetch provinces on component mount
    axios.get(`${host}?depth=1`).then((response) => {
      setProvinces(response.data);
    });
  }, []);

  const handleProvinceChange = (event) => {
    const selectedProvinceCode = event.target.value;
    axios.get(`${host}p/${selectedProvinceCode}?depth=2`).then((response) => {
      setDistricts(response.data.districts);
    });
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictCode = event.target.value;
    axios.get(`${host}d/${selectedDistrictCode}?depth=2`).then((response) => {
      setWards(response.data.wards);
    });
  };

  const handleWardChange = (event) => {
    // Handle ward change
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Tạo nhân viên
      </h2>
      <form action="#">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Other form elements */}
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Họ tên
            </label>
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập họ tên"
              required=""
            />
          </div>

          <div class="w-full">
            <label
              for="brand"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="username"
              required=""
            />
          </div>
          <div class="w-full">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div class="w-full">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CCCD
            </label>
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập CCCD"
              required=""
            />
          </div>
          <div class="w-full">
            <label
              for="dateOfBirth"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ngày sinh
            </label>
            <input
              type="date"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required=""
            />
          </div>
          <div className="sm:col-span-1">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="sm:col-span-1">
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Vai trò
            </label>
            <select
              id="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected="">Select role</option>
              <option value="giaodichvien">Giao dịch viên</option>
              <option value="nhanviengiaohang">Nhân viên giao hàng</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="province"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Địa điểm
            </label>
            <input
              type="text"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="44 Xuân Thuỷ, Hà Nội"
              required
            />
          </div>

          {/* Other form elements */}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-buttonCreate rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Tạo nhân viên
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormGiaoDich;
