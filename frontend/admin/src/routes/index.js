import {
  MagicPost,
  Overview,
  DiemGiaoDich,
  DiemTapKet,
  DSNhanVien,
  DanhSachDonHang,
  DanhSachNgoaiKhu,
  DanhSachDonNoiKhu,
  FormBienNhan,
} from "../pages";

const publicRoutes = [
  { path: "/", component: Overview },
  { path: "/overview", component: Overview },
  { path: "/director/overview", component: Overview },
  { path: "/director/diemgiaodich", component: DiemGiaoDich },
  { path: "/director/diemtapket", component: DiemTapKet },
  { path: "/director/nhanvien", component: DSNhanVien },
  { path: "/gp_lead/danhsachdonhang", component: DanhSachDonHang },
  { path: "/tp_employee/donngoaikhu", component: DanhSachNgoaiKhu },
  { path: "/tp_employee/donnoikhu", component: DanhSachDonNoiKhu },
  { path: "tp_employee/donngoaikhu/formbiennhan", component: FormBienNhan },
];

export { publicRoutes };
