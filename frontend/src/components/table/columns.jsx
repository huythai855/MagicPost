import { ColumnFilter } from "./ColumnFilter";
import { FaEye } from "react-icons/fa";

export const COLUMNS = [
  {
    title: "Giám đốc",
    columns: [
      {
        Header: "STT",
        accessor: "id",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Mã điểm",
        accessor: "id_company",
        Filter: ColumnFilter,
      },
      { Header: "Tên điểm", accessor: "name", Filter: ColumnFilter },
      { Header: "Địa chỉ", accessor: "address", Filter: ColumnFilter },
      { Header: "Trưởng điểm", accessor: "manager", Filter: ColumnFilter },
      { Header: "Doanh số", accessor: "sales", Filter: ColumnFilter },
    ],
  },
  {
    title: "Trưởng điểm giao dịch",
    columns: [
      {
        Header: "STT",
        accessor: "id",
        Filter: ColumnFilter,
        disableFilters: true,
      },
      {
        Header: "Họ tên",
        accessor: "fullName",
        Filter: ColumnFilter,
      },
      { Header: "Ngày sinh", accessor: "dateOfBirth", Filter: ColumnFilter },
      { Header: "Địa chỉ", accessor: "address", Filter: ColumnFilter },
      { Header: "Email", accessor: "email", Filter: ColumnFilter },
      { Header: "Vai trò", accessor: "role", Filter: ColumnFilter },
    ],
  },
  {
    title: "Giao dịch viên",
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
    ],
  },
];
