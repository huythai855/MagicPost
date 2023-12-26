import React, { useState, useEffect } from "react";
import axios from "axios";

import QRCode from "qrcode.react";
import { green } from "@material-ui/core/colors";
import { useNavigate, useParams } from "react-router";
const API = "https://6570c47809586eff6641ea69.mockapi.io/donhang/donhang";
const host = "https://provinces.open-api.vn/api/";
const FormTapKet = ({ packageId }) => {
  // State for form data
  // const [formData, setFormData] = useState([]);
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(host + "?depth=1");
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            host + "p/" + selectedProvince + "?depth=2"
          );
          setDistricts(response.data.districts);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };

      fetchDistricts();
    }
  }, [selectedProvince]);

  const handleProvinceChange = (event) => {
    const selectedProvinceCode = event.target.value;
    setSelectedProvince(selectedProvinceCode);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictCode = event.target.value;
    setSelectedDistrict(selectedDistrictCode);
  };
  const renderOptions = (array) => {
    if (array === provinces) {
      return array.map((element) => (
        <option key={element.code} value={element.code}>
          {element.name}
        </option>
      ));
    } else {
      return array.map((element) => (
        <option key={element.code} value={element.name}>
          {element.name}
        </option>
      ));
    }
  };
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
    <div className="bg-gray-100 p-4 mx-20 mb-5 ">
      <form>
        {/* <h2 className="mb-4  text-center text-2xl font-bold text-gray-900 dark:text-white">
          Chi tiết đơn hàng
        </h2> */}

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
                  value={formData.fullName}
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
                  value={formData.address}
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
            </div>
          </div>
          <div>
            <div className="max-w-content mx-auto mx-20">
              <h3 className="mb-4 text-center text-rg font-bold text-gray-900 dark:text-white">
                Chuyển tới
              </h3>
              <div className="sm:col-span-2">
                <label
                  htmlFor="province"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Địa điểm
                </label>

                <select
                  name=""
                  value={selectedProvince}
                  id="province"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleProvinceChange}
                  // Other attributes
                >
                  <option disabled value="">
                    Chọn tỉnh/thành phố
                  </option>
                  {provinces && renderOptions(provinces)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="province"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quận, huyện
                </label>

                <select
                  name=""
                  value={selectedDistrict}
                  id="district"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleDistrictChange}
                  // Other attributes
                >
                  <option disabled value="">
                    Chọn quận/huyện
                  </option>
                  {districts && renderOptions(districts)}
                </select>
              </div>
              <div className="w-90">
                <label
                  for="first_name"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nơi nhận
                </label>
                <select
                  // onChange={e => setFormData({...formData, status: e.target.value})}
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
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
                  disabled={
                    formData.status === "Giao thất bại" ||
                    formData.status === "Giao thành công"
                  }
                  style={
                    ["Giao thất bại", "Giao thành công"].includes(
                      formData.status
                    )
                      ? {
                          backgroundColor: "green",
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
        {/* Thông tin đơn hàng */}
        {/* Nút submit */}
      </form>
    </div>
  );
};

export default FormTapKet;
