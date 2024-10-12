import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useStateContext } from "../../contexts/ContextProvider";
import { COLUMNS } from "./columns";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaSort } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import FormTapKet from "../Forms/FormTapKet";
import { FaLink } from "react-icons/fa6";

import FormDelete from "../Forms/FormDelete";
import CustomModal from "../Modal/CustomModal";
import EditModal from "../Modal/EditModal";

import "./table.css";
import axios from "axios";

const TableDonHang = ({ title, dataSource, API }) => {
  const columns = useMemo(() => {
    const selectedColumns = COLUMNS.find((group) => group.title === title);
    return selectedColumns ? selectedColumns.columns : [];
  }, [title]);
  const data = useMemo(() => dataSource, []);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
    state: { filters },
  } = useTable({ columns, data }, useFilters, useSortBy, usePagination);
  const { pageIndex, pageSize } = state;
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteId, setDeleteId] = useState("");

  const { dataValue, setDataValue } = useState(null);

  const handleViewOpen = () => {};

  return (
    <div className=" overflow-x-auto shadow-md sm:rounded-l ">
      <table
        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        {...getTableProps()}
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(
                      index === 0 ? {} : column.getSortByToggleProps()
                    )}
                    className={index === 0 ? "first-column" : ""}
                    key={column.id} // Add a unique key
                  >
                    {column.render("Header")}
                    {index !== 0 && (
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown />
                          ) : (
                            <FaSortUp />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </span>
                    )}
                  </th>
                ))}
                {title === "Đơn hàng ngoại khu" && <th key="ACTION">ACTION</th>}
              </tr>
              <tr key="filter-row">
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))}
                {title === "Đơn hàng ngoại khu" && (
                  <th style={{ backgroundColor: "#04AA6D" }} key="empty"></th>
                )}
              </tr>
            </React.Fragment>
          ))}
        </thead>
        <tbody
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          {...getTableBodyProps()}
        >
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className={index === 0 ? "first-column" : ""}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
                {title === "Đơn hàng ngoại khu" && (
                  <td>
                    <div className="flex justify-center items-center">
                      <button
                        id="send"
                        className="focus:outline-none w-28 text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl"
                      >
                        Gửi hàng
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <MdFirstPage />
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <GrFormPrevious />
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <GrFormNext />
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <MdLastPage />
        </button>
      </div>
    </div>
  );
};
export default TableDonHang;
