import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar } from "./components";
import {
  MagicPost,
  Overview,
  DiemGiaoDich,
  DiemTapKet,
  DSNhanVien,
} from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import "./App.css";
import SortingTable from "./components/Table/SortingTable";
import { GiMagicPalm } from "react-icons/gi";

const GiamDoc = () => {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar role={"Giám đốc"} />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar role={"Giám đốc"} />
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
            {/* <Routes>
              {/* Giamdoc */}
            {/* <Route path="/director/overview" element={<Overview />} />
              <Route path="/director/diemtapket" element={<DiemTapKet />} />
              <Route path="/director/diemgiaodich" element={<DiemGiaoDich />} />
              <Route path="/director/nhanvien" element={<DSNhanVien />} /> */}
            {/* Tinh nang */}
            {/* <Route path="/helpcentre" element="Help Centre" />
              <Route path="/contactus" element="Contact Us" />
              <Route path="/logout" element="Log Out" />
            </Routes> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiamDoc;
