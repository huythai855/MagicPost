import React, { useState, useEffect } from "react";
import axios from "axios";

const FormGiaoDich = ({ onSubmit }) => {
  const host = "https://provinces.open-api.vn/api/";
  const API = "http://localhost:3001/department/new";
  const [id_company, setId_company] = useState("id51");
  const [sales, setSales] = useState("534534");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [provinces2, setProvinces2] = useState();

  const [districts2, setDistricts2] = useState();
  const [manager, setManager] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [selectedManager, setSelectedManager] = useState(""); // Use a single manager, not an array

  const [diemTapKetData, setDiemTapKetData] = useState([]);

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
    console.log(event.target.value);
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

  const handleManagerChange = (event) => {
    const selectedManagerValue = event.target.value;
    setSelectedManager(selectedManagerValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDGD = {
      name: name,
      address: address,
      city: provinces2[selectedProvince - 1].name,
      district: selectedDistrict,
      leader_id: selectedManager,
      type: 1,
    };
    console.log(provinces2);

    console.log(newDGD);
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDGD),
      });

      const json = await response.json();
      const id = json.id;

      // await getData();
      // alert("Your id is: " + id);
    } catch (error) {
      alert(error.message);
    }
    onSubmit();
    window.location.href = "diemgiaodich";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {/* Other form elements */}
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tên Điểm
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
              required=""
            />
          </div>
          <div className="sm:col-span-2">
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Địa điểm
            </label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              name="name"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nhập địa điểm"
              required=""
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Trưởng điểm
            </label>
            <select
              id="category"
              value={selectedManager}
              onChange={handleManagerChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="">Select name</option>
              <option value="Nguyễn Huy Thái">Nguyễn Huy Thái</option>
              <option value="Nguyễn Thị Lan Nhi">Nguyễn Thị Lan Nhi</option>
              <option value="Trương Thị Huyền Trâm">
                Trương Thị Huyền Trâm
              </option>
            </select>
          </div>

          {/* Other form elements */}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center  px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-buttonCreate rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Tạo điểm giao dịch
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormGiaoDich;
