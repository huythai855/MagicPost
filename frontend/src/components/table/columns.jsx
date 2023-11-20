import { ColumnFilter } from "./ColumnFilter";
import { FaEye } from "react-icons/fa";
export const COLUMNS = [
  { Header: "STT", accessor: "id", Filter: ColumnFilter, disableFilters: true },
  { Header: "Mã điểm", accessor: "id_company", Filter: ColumnFilter },
  { Header: "Tên điểm", accessor: "name", Filter: ColumnFilter },
  { Header: "Địa chỉ", accessor: "address", Filter: ColumnFilter },
  { Header: "Trưởng điểm", accessor: "manager", Filter: ColumnFilter },
  { Header: "Doanh số", accessor: "sales", Filter: ColumnFilter },
];
