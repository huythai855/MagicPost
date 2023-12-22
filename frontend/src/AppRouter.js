import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import "./index.css";
import "./App.css";
import { useEffect, useState } from 'react';
import {
  Login,
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
  const [email, setEmail] = useState("")
  return (
    <BrowserRouter>
      <Sidebar role="Nhân viên giao dịch">
        <ContextProvider>
          <Routes>

            {/* Dang nhap */}
            <Route path="/login" element={<Login setEmail={setEmail} />} />

            {/* Giamdoc */}
            <Route path="/" element={<Overview />} />
            <Route path="director/overview" element={<Overview />} />
            <Route path="director/diemtapket" element={<DiemTapKet />} />
            <Route path="director/diemgiaodich" element={<DiemGiaoDich />} />
            <Route
              path="director/nhanvien"
              element={<DSNhanVien boss={"Giám đốc"} />}
            />

            {/* Truongdiemtapket */}
            <Route path="gp_lead/overview" element={<Overview />} />
            <Route
              path="gp_lead/danhsachdonhang"
              element={<DanhSachDonHang />}
            />
            <Route
              path="gp_lead/nhanvien"
              element={<DSNhanVien boss={"Trưởng điểm tập kết"} />}
            />

            {/* Truongdiemgiaodich*/}
            <Route path="tp_lead/overview" element={<Overview />} />
            <Route
              path="tp_lead/danhsachdonhang"
              element={<DanhSachDonHang />}
            />
            <Route
              path="tp_lead/nhanvien"
              element={<DSNhanVien boss={"Trưởng điểm giao dịch"} />}
            />

            {/* Nhanvientapket */}
            <Route
              path="gp_employee/danhsachdonhang"
              element={<DanhSachDonHang boss="Nhân viên tập kết" />}
            />

            {/* Nhanviengiaodich */}
            <Route
              path="tp_employee/donnoikhu"
              element={<DanhSachDonNoiKhu />}
            />
            <Route
              path="tp_employee/donngoaikhu"
              element={<DanhSachNgoaiKhu />}
            />
            <Route
              path="tp_employee/donngoaikhu/formbiennhan"
              element={<FormBienNhan />}
            />

            {/* Nhanviengiaohang */}
          </Routes>
        </ContextProvider>
      </Sidebar>
    </BrowserRouter>
  );
}
export default AppRouter;
