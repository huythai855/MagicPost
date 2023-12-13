import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";

import "./index.css";
import GiamDoc from "./GiamDoc";
import TruongDiemGiaoDich from "./TruongDiemGiaoDich";
import NhanVienGD from "./NhanVienGD";
import {
  MagicPost,
  Overview,
  DiemGiaoDich,
  DiemTapKet,
  DSNhanVien,
} from "./pages";
import { ContextProvider } from "./contexts/ContextProvider";
function AppRouter() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/director/*" element={<GiamDoc />} />
          <Route path="/gp_lead" element={<TruongDiemGiaoDich />} />
          <Route path="/gp_employee" element={<NhanVienGD />} />
          <Route path="/director/overview" element={<Overview />} />
          <Route path="/director/diemtapket" element={<DiemTapKet />} />
          <Route path="/director/diemgiaodich" element={<DiemGiaoDich />} />
          <Route path="/director/nhanvien" element={<DSNhanVien />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}
export default AppRouter;
