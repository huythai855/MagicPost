import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";

const FormNhanVien = ({ onSubmit }) => {
  const API =
    "https://6570b2dc09586eff6641d340.mockapi.io/api/diemtapket/NhanVien";
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [CCCD, setCCCD] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNV = {
      fullName: fullName,
      userName: userName,
      password: password,
      CCCD: CCCD,
      email: email,
      role: role,
      dateOfBirth: dateOfBirth,
      address: address,
    };

    console.log(newNV);
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNV),
      });

      const json = await response.json();
      const id = json.id;

      // await getData();
      // alert("Your id is: " + id);
    } catch (error) {
      alert(error.message);
    }
    onSubmit();
  };
  return (
    <div>
      <>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Tạo nhân viên
        </h2>

        <form onSubmit={handleSubmit}>
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
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
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
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
                value={CCCD}
                onChange={(e) => {
                  setCCCD(e.target.value);
                }}
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
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                }}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected="">Select role</option>
                <option value="Giao dịch viên">Giao dịch viên</option>
                <option value="Nhân viên giao hàng">Nhân viên giao hàng</option>
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
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
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
      </>
    </div>
  );
};

export default FormNhanVien;
