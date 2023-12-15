import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import "./index.css";
import "./App.css";
import {
  MagicPost,
  Overview,
  DiemGiaoDich,
  DiemTapKet,
  DSNhanVien,
  DanhSachDonHang,
  DanhSachNgoaiKhu,
  DanhSachDonNoiKhu,
  DanhSachKienHang,
  FormBienNhan,
} from "./pages";
import { Sidebar, Navbar } from "./components";
import { ContextProvider } from "./contexts/ContextProvider";
function AppRouter() {
  return (
    <BrowserRouter>
      <Sidebar role="Nhân viên giao dịch">
        <ContextProvider>
          <Routes>
            {/* Giamdoc */}
            <Route path="/" element={<Overview />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/diemtapket" element={<DiemTapKet />} />
            <Route path="/diemgiaodich" element={<DiemGiaoDich />} />
            <Route path="/nhanvien" element={<DSNhanVien />} />
            {/* Truongdiemtapket */}

            {/* Truongdiemgiaodich*/}
            <Route path="/danhsachdonhang" element={<DanhSachDonHang />} />

            {/* Nhanvientapket */}

            {/* Nhanviengiaodich */}
            <Route path="/donnoikhu" element={<DanhSachDonNoiKhu />} />
            <Route path="/donngoaikhu" element={<DanhSachNgoaiKhu />} />
            <Route path="/danhsachkienhang" element={<DanhSachKienHang />} />
            <Route path="/formbiennhan" element={<FormBienNhan />} />

            {/* Nhanvienvanchuyen */}

            {/* Nhanviengiaohang */}
          </Routes>
        </ContextProvider>
      </Sidebar>
    </BrowserRouter>
  );
}
export default AppRouter;
