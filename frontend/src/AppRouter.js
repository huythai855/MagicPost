import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";

import "./index.css";
import GiamDoc from "./GiamDoc";
import TruongDiemGiaoDich from "./TruongDiemGiaoDich";
import NhanVien from "./NhanVien";
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
          <Route path="/director" element={<GiamDoc />} />
          <Route path="/gp_lead" element={<TruongDiemGiaoDich />} />
          <Route path="/gp_employee" element={<NhanVien />} />

          <Route path="/overview" element={<Overview />} />
          <Route path="/diemtapket" element={<DiemTapKet />} />
          <Route path="/diemgiaodich" element={<DiemGiaoDich />} />
          <Route path="/nhanvien" element={<DSNhanVien />} />

          {/* Tinh nang */}
          <Route path="/helpcentre" element="Help Centre" />
          <Route path="/contactus" element="Contact Us" />
          <Route path="/logout" element="Log Out" />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}
export default AppRouter;
