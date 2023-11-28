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
        Tạo điểm giao dịch
      </h2>
      <form action="#">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Other form elements */}
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tên Điểm
            </label>
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
              required=""
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="province"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Địa điểm
            </label>
            <select
              name=""
              id="province"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={handleProvinceChange}
              // Other attributes
            >
              <option value="">Chọn tỉnh thành</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="district"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quận
            </label>
            <select
              name=""
              id="district"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={handleDistrictChange}
              // Other attributes
            >
              <option value="">Chọn quận, huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="province"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phường
            </label>
            <select
              name=""
              id="ward"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={handleWardChange}
              // Other attributes
            >
              <option value="">Chọn phường, xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Trưởng điểm
            </label>
            <select
              id="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected="">Select name</option>
              <option selected="">Nguyễn Huy Thái</option>
              <option value="TV">Nguyễn Thị Lan Nhi</option>
              <option value="PC">Trương Thị Huyền Trâm</option>
            </select>
          </div>

          {/* Other form elements */}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-buttonCreate rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Tạo điểm giao dịch
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormGiaoDich;
