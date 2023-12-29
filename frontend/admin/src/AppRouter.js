import React from "react";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import "./index.css";
import "./App.css";
import { useEffect, useState } from "react";
import {
  Login,
  Shipper,
  MagicPost,
  Overview,
  DiemGiaoDich,
  DiemTapKet,
  DSNhanVien,
  DanhSachDonHang,
  DanhSachNgoaiKhu,
  DanhSachNgoaiKhuNew,
  DanhSachDonNoiKhu,
  DanhSachKienHang,
  DanhSachVanChuyen,
  FormBienNhan,
  DanhSachNK,
  DanhSachDonHangDenTKV,
  DanhSachDonHangDiTKV,
} from "./pages";
import { Sidebar, Navbar } from "./components";
import { ContextProvider } from "./contexts/ContextProvider";
function AppRouter() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [name, setName] = useState(localStorage.getItem("fullname"));

  const [department_id, setDepartment_id] = useState(
    localStorage.getItem("department_id")
  );
  console.log(name);
  console.log(localStorage.getItem("fullname"));
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* Dang nhap */}
        <Route path="/login" element={<Login setEmail={setEmail} />} />

        {/* Other routes */}
        <Route
          path="/*"
          element={
            <ContextProvider>
              <Sidebar role={role}>
                <Navbar username={name} />
                <Routes>
                  {/* Shipper */}
                  {role === "shipper" && (
                    <>
                      <Route path="/shipper/dsgh" element={<Shipper />} />
                      <Route
                        path="/shipper/dsvc"
                        element={<DanhSachVanChuyen />}
                      />
                    </>
                  )}

                  {/* Giamdoc */}
                  {role === "director" && (
                    <>
                      <Route path="director/" element={<Overview />} />
                      <Route path="director/overview" element={<Overview />} />
                      <Route
                        path="director/diemtapket"
                        element={<DiemTapKet />}
                      />
                      <Route
                        path="director/diemgiaodich"
                        element={<DiemGiaoDich />}
                      />
                      <Route
                        path="director/nhanvien"
                        element={<DSNhanVien boss={"Giám đốc"} />}
                      />{" "}
                    </>
                  )}

                  {/* Truongdiemtapket */}
                  {role === "gathering_point_leader" && (
                    <>
                      <Route path="gp_lead/" element={<Overview />} />

                      <Route path="gp_lead/overview" element={<Overview />} />
                      <Route
                        path="gp_lead/danhsachdonhang"
                        element={<DanhSachDonHang />}
                      />
                      <Route
                        path="gp_lead/nhanvien"
                        element={<DSNhanVien boss={"Trưởng điểm tập kết"} />}
                      />
                    </>
                  )}

                  {/* Truongdiemgiaodich*/}
                  {role === "transaction_point_leader" && (
                    <>
                      <Route path="tp_lead/" element={<Overview />} />
                      <Route path="tp_lead/overview" element={<Overview />} />
                      <Route
                        path="tp_lead/danhsachdonhang"
                        element={<DanhSachDonHang />}
                      />
                      <Route
                        path="tp_lead/nhanvien"
                        element={<DSNhanVien boss={"Trưởng điểm giao dịch"} />}
                      />
                    </>
                  )}

                  {/* Nhanvientapket */}
                  {role === "gathering_point_staff" && (
                    <>
                      <Route
                        path="gp_employee/"
                        element={<DanhSachDonHangDenTKV />}
                      />

                      <Route
                        path="gp_employee/danhsachdonhang"
                        element={<DanhSachDonHangDenTKV />}
                      />
                    </>
                  )}

                  {/* Nhanviengiaodich */}
                  {role === "transaction_point_staff" && (
                    <>
                      <Route
                        path="tp_employee/donnoikhu"
                        element={<DanhSachNK />}
                      />
                      <Route
                        path="tp_employee/donngoaikhu"
                        element={<DanhSachNgoaiKhuNew />}
                      />
                      <Route
                        path="tp_employee/donngoaikhu/formbiennhan"
                        element={<FormBienNhan />}
                      />
                    </>
                  )}
                </Routes>
              </Sidebar>
            </ContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
