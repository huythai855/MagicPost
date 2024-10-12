import React, { useState, useEffect } from "react";
import axios from "axios";

import QRCode from "qrcode.react";

const FormBienNhan = (recordForDetail) => {
  const host = "https://provinces.open-api.vn/api/";
  const API = "http://localhost:3001/item/new";
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();

  const [districtsNhan, setDistrictsNhan] = useState();
  const [provincesNhan, setProvincesNhan] = useState();

  const [selectedProvince, setSelectedProvince] = useState("");
  //TODO: fix
  const [selectedProvinceNhan, setSelectedProvinceNhan] = useState("");

  const [provinces2, setProvinces2] = useState();
  const [provincesNhan2, setProvincesNhan2] = useState();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDistrictNhan, setSelectedDistrictNhan] = useState("");

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
    const fetchProvincesNhan = async () => {
      try {
        const response = await axios.get(host + "?depth=1");
        setProvincesNhan(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvincesNhan();
  }, []);

  useEffect(() => {
    const fetchProvinces2 = async () => {
      try {
        const response = await axios.get(host + "?depth=1");
        setProvinces2(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces2();
  }, []);

  useEffect(() => {
    const fetchProvincesNhan2 = async () => {
      try {
        const response = await axios.get(host + "?depth=1");
        setProvincesNhan2(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvincesNhan2();
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
  useEffect(() => {
    if (selectedProvinceNhan) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            host + "p/" + selectedProvinceNhan + "?depth=2"
          );
          setDistrictsNhan(response.data.districts);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };

      fetchDistricts();
    }
  }, [selectedProvinceNhan]);
  const handleProvinceChange = (event) => {
    const selectedProvinceCode = event.target.value;
    setSelectedProvince(selectedProvinceCode);
    localStorage.setItem("province1", selectedProvinceCode);
  };
  const handleProvinceNhanChange = (event) => {
    const selectedProvinceNhanCode = event.target.value;
    console.log(selectedProvinceNhanCode);
    setSelectedProvinceNhan(selectedProvinceNhanCode);
    localStorage.setItem("province2", selectedProvinceNhanCode);
    console.log("is clicked");
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictCode = event.target.value;
    setSelectedDistrict(selectedDistrictCode);
  };
  const handleDistrictChangeNhan = (event) => {
    const selectedDistrictCode = event.target.value;
    setSelectedDistrictNhan(selectedDistrictCode);
  };
  const renderOptions = (array) => {
    if (array === provinces || array === provincesNhan) {
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
  // State for form data
  const [formData, setFormData] = useState({
    sender: {
      sender_name: "",
      sender_address: "",
      sender_tel_number: "",
    },
    receiver: {
      receiver_name: "",
      receiver_address: "",
      receiver_tel_number: "",
    },
    donHang: {
      type_of_good: "",
      weight: "",
      tongCuoc: "",
      nguoiThanhToanCuoc: "",
      dichVuThem: "",
      nguoiTaoDon: "",
    },
  });

  // Handle form field changes
  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDH = {
      department_id: parseInt(localStorage.getItem("department_id")),
      weight: formData.donHang.weight,
      type_of_good: formData.donHang.type_of_good,
      sender_name: formData.sender.sender_name,

      //sai
      sender_address_city: localStorage.getItem("province1"),
      receiver_address_city: localStorage.getItem("province2"),

      sender_address_district: selectedDistrict,
      sender_address: formData.sender.sender_address,
      sender_tel_number: formData.sender.sender_address,
      receiver_name: formData.receiver.receiver_name,
      receiver_address_district: selectedDistrictNhan,
      receiver_address: formData.receiver.receiver_address,
      receiver_tel_number: formData.receiver.receiver_tel_number,
      // date: `${ngay} / ${thang} / ${nam}`,
    };

    console.log(selectedProvinceNhan);

    console.log(newDH);
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDH),
      });

      const json = await response.json();
      console.log(json);
    } catch (error) {
      alert(error.message);
    }
    // onSubmit();
    window.location.href = "http://localhost:3000/tp_employee/donngoaikhu";
  };

  const d = new Date();
  const ngay = d.getDate();
  const thang = d.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0, nên cần cộng thêm 1
  const nam = d.getFullYear();

  return (
    <div className="bg-gray-100 p-4 mb-10 ">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4  text-center text-2xl font-bold text-gray-900 dark:text-white">
          Biên nhận đơn hàng
        </h2>
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
                  value={formData.sender.sender_name}
                  onChange={(e) =>
                    handleInputChange("sender", "sender_name", e.target.value)
                  }
                  required
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

                  <select
                    name=""
                    value={selectedProvince}
                    id="province"
                    className="bg-gray-50 mr-28  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleProvinceChange}
                    // Other attributes
                  >
                    <option disabled value="">
                      Chọn tỉnh/thành phố
                    </option>
                    {provinces && renderOptions(provinces)}
                  </select>
                </div>

                <div className="md:ml-10 md:col-span-2">
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quận, huyện
                  </label>

                  <select
                    name=""
                    value={selectedDistrict}
                    id="district"
                    className="bg-gray-50 mr-28   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleDistrictChange}
                    // Other attributes
                  >
                    <option disabled value="">
                      Chọn quận/huyện
                    </option>
                    {districts && renderOptions(districts)}
                  </select>
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
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="144 Xuan Thuy"
                  value={formData.sender.sender_address}
                  onChange={(e) =>
                    handleInputChange(
                      "sender",
                      "sender_address",
                      e.target.value
                    )
                  }
                  required
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
                  value={formData.sender.sender_tel_number}
                  onChange={(e) =>
                    handleInputChange(
                      "sender",
                      "sender_tel_number",
                      e.target.value
                    )
                  }
                  required
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
                  value={formData.receiver.receiver_name}
                  onChange={(e) =>
                    handleInputChange(
                      "receiver",
                      "receiver_name",
                      e.target.value
                    )
                  }
                  required
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

                  <select
                    name=""
                    value={selectedProvinceNhan}
                    id="province"
                    className="bg-gray-50 mr-28  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleProvinceNhanChange}
                    // Other attributes
                  >
                    <option disabled value="">
                      Chọn tỉnh/thành phố
                    </option>
                    {provincesNhan && renderOptions(provincesNhan)}
                  </select>
                </div>

                <div className="md:ml-10 md:col-span-2">
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quận, huyện
                  </label>

                  <select
                    name=""
                    value={selectedDistrictNhan}
                    id="district"
                    className="bg-gray-50 mr-28   border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleDistrictChangeNhan}
                    // Other attributes
                  >
                    <option disabled value="">
                      Chọn quận/huyện
                    </option>
                    {districtsNhan && renderOptions(districtsNhan)}
                  </select>
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
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="144 Xuan Thuy"
                  value={formData.receiver.receiver_address}
                  onChange={(e) =>
                    handleInputChange(
                      "receiver",
                      "receiver_address",
                      e.target.value
                    )
                  }
                  required
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
                  value={formData.receiver.receiver_tel_number}
                  onChange={(e) =>
                    handleInputChange(
                      "receiver",
                      "receiver_tel_number",
                      e.target.value
                    )
                  }
                  required
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
                  value={formData.donHang.type_of_good}
                  onChange={(e) =>
                    handleInputChange("donHang", "type_of_good", e.target.value)
                  }
                  required
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
                  value={formData.donHang.weight}
                  onChange={(e) =>
                    handleInputChange("donHang", "weight", e.target.value)
                  }
                  required
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
                  value={formData.donHang.tongCuoc}
                  onChange={(e) =>
                    handleInputChange("donHang", "tongCuoc", e.target.value)
                  }
                />
              </div>
              <div className="w-90">
                <label
                  for="first_name"
                  className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Dịch vụ thêm
                </label>
                <select
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.donHang.dichVuThem}
                  onChange={(e) =>
                    handleInputChange("donHang", "dichVuThem", e.target.value)
                  }
                  required
                >
                  <option value="">Chọn dịch vụ</option>
                  <option value="dongkiem">Đồng kiểm</option>
                  <option value="thutienxemhang">Thu tiền xem hàng</option>
                </select>
              </div>

              <div className="w-90">
                <label
                  for="first_name"
                  className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Người thanh toán cước
                </label>
                <select
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.donHang.nguoiThanhToanCuoc}
                  onChange={(e) =>
                    handleInputChange(
                      "donHang",
                      "nguoiThanhToanCuoc",
                      e.target.value
                    )
                  }
                  required
                >
                  <option value="">Chọn người thanh toán</option>
                  <option value="dongkiem">Người gửi</option>
                  <option value="thutienxemhang">Người nhận</option>
                </select>
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
                  className="bg-gray-50 mb-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nguyen Van A"
                  value={formData.donHang.nguoiTaoDon}
                  onChange={(e) =>
                    handleInputChange("donHang", "nguoiTaoDon", e.target.value)
                  }
                  required
                />
              </div>
              <div className="flex justify-end mt-40">
                <button
                  type="submit"
                  className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
                >
                  Gửi biên nhận
                </button>

                <button
                  type="submit"
                  className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
                >
                  In biên nhận
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

export default FormBienNhan;
