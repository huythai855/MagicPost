import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, SidebarTDG, SidebarGDV } from "./components";
import {
  MagicPost,
  Overview,
  DiemGiaoDich,
  DiemTapKet,
  DanhSachDonHang,
  DanhSachDonHangGDV,
  DanhSachKienHang,
} from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import "./App.css";

import TableSelection from "./components/Table/TableSelection";
import SortingTable from "./components/Table/SortingTable";
import { GiMagicPalm } from "react-icons/gi";

const NhanVienGD = () => {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <SidebarGDV />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <SidebarGDV />
            </div>
          )}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? " md:ml-72" : " flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
                {/* Giamdoc */}
                {/* <Route path="/" element={<DiemGiaoDich />} /> */}
                <Route
                  path="/danhsachdonhangGDV"
                  element={<DanhSachDonHangGDV />}
                />
                <Route
                  path="/danhsachkienhang"
                  element={<DanhSachKienHang />}
                />

                {/* Tinh nang */}
                <Route path="/helpcentre" element="Help Centre" />
                <Route path="/contactus" element="Contact Us" />
                <Route path="/logout" element="Log Out" />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default NhanVienGD;
