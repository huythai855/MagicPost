import { ColumnFilter } from "./ColumnFilter";
import { FaEye } from "react-icons/fa";

export const COLUMNS = [
  {
    title: "Điểm tập kết",
    columns: [
      {
        Header: "STT",
        Filter: ColumnFilter,
        disableFilters: true,
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Mã điểm",
        accessor: "id",
        Filter: ColumnFilter,
      },
      { Header: "Tên điểm", accessor: "name", Filter: ColumnFilter },
      { Header: "Địa chỉ", accessor: "address", Filter: ColumnFilter },
      {
        Header: "Số lượng nhân viên",
        accessor: "total_employee",
        Filter: ColumnFilter,
      },

      { Header: "Trưởng điểm", accessor: "leader_id", Filter: ColumnFilter },
    ],
  },
  {
    title: "Thống kê",
    columns: [
      {
        Header: "STT",
        Filter: ColumnFilter,
        disableFilters: true,
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Mã điểm",
        accessor: "id",
        Filter: ColumnFilter,
      },
      { Header: "Tên điểm", accessor: "name", Filter: ColumnFilter },
      {
        Header: "Doanh số hôm nay",
        accessor: "total_revenue_today",
        Filter: ColumnFilter,
      },

      {
        Header: "tổng số nhân viên",
        accessor: "total_employees",
        Filter: ColumnFilter,
      },
      {
        Header: "địa chỉ",
        accessor: "address",
        Filter: ColumnFilter,
      },
    ],
  },
  {
    title: "Điểm giao dịch",
    columns: [
      {
        Header: "STT",
        Filter: ColumnFilter,
        disableFilters: true,
        id: "index",
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Mã điểm",
        accessor: "id",
        Filter: ColumnFilter,
      },
      { Header: "Tên điểm", accessor: "name", Filter: ColumnFilter },
      { Header: "Địa chỉ", accessor: "address", Filter: ColumnFilter },
      {
        Header: "Số lượng nhân viên",
        accessor: "total_employee",
        Filter: ColumnFilter,
      },
      { Header: "Trưởng điểm", accessor: "leader_id", Filter: ColumnFilter },
    ],
  },
  {
    title: "Nhân viên",
    columns: [
      {
        Header: "STT",
        id: "index",
        accessor: (_row, i) => i + 1,
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Họ tên",
        accessor: "fullname",
        Filter: ColumnFilter,
      },
      { Header: "Ngày sinh", accessor: "date_of_birth", Filter: ColumnFilter },
      { Header: "Số điện thoại", accessor: "tel_number", Filter: ColumnFilter },
      { Header: "Địa chỉ", accessor: "address", Filter: ColumnFilter },
      { Header: "Vai trò", accessor: "role", Filter: ColumnFilter },
      {
        Header: "Nơi làm việc",
        accessor: "department_id",
        Filter: ColumnFilter,
      },
    ],
  },
  {
    title: "Đơn hàng",
    columns: [
      {
        Header: "STT",
        accessor: "id",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Mã đơn hàng",
        accessor: "maDonHang",
        Filter: ColumnFilter,
      },
      { Header: "Người gửi", accessor: "fullName", Filter: ColumnFilter },
      { Header: "Ngày gửi", accessor: "date", Filter: ColumnFilter },
      { Header: "Điểm nhận", accessor: "address", Filter: ColumnFilter },
      { Header: "Loại hàng", accessor: "typeOfGoods", Filter: ColumnFilter },
      { Header: "Trạng thái", accessor: "status", Filter: ColumnFilter },
    ],
  },
  {
    title: "Đơn hàng nội khu",
    columns: [
      {
        Header: "STT",
        accessor: "id",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Mã đơn hàng",
        accessor: "maDonHang",
        Filter: ColumnFilter,
      },
      { Header: "Người gửi", accessor: "fullName", Filter: ColumnFilter },
      { Header: "Ngày gửi", accessor: "date", Filter: ColumnFilter },
      { Header: "Điểm nhận", accessor: "address", Filter: ColumnFilter },
      { Header: "Loại hàng", accessor: "typeOfGoods", Filter: ColumnFilter },
      { Header: "Trạng thái", accessor: "status", Filter: ColumnFilter },
    ],
  },
  {
    title: "Đơn hàng ngoại khu",
    columns: [
      {
        Header: "STT",
        accessor: "id",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Mã đơn hàng",
        accessor: "maDonHang",
        Filter: ColumnFilter,
      },
      { Header: "Người gửi", accessor: "fullName", Filter: ColumnFilter },
      { Header: "Ngày gửi", accessor: "date", Filter: ColumnFilter },
      { Header: "Điểm nhận", accessor: "address", Filter: ColumnFilter },
      { Header: "Loại hàng", accessor: "typeOfGoods", Filter: ColumnFilter },
      { Header: "Trạng thái", accessor: "status", Filter: ColumnFilter },
    ],
  },
];
