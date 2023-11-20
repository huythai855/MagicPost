import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import MOCK_DATA from "../MOCK_DATA.json";
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

import "./table.css";

const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

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
  const handleViewDetail = (rowData) => {
    // Handle logic for "View Detail" button click
    console.log("View detail for row:", rowData);
    // You can add your logic to display details or navigate to a detail page here
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-fit justify-center ">
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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={index === 0 ? "first-column" : ""}
                  >
                    {column.render("Header")}
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
                  </th>
                ))}
              </tr>

              <tr>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))}
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
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
                <td class="px-6 py-4">
                  <a
                    href="#edit"
                    class="font-medium text-gray-700 dark:text-blue-500 hover:underline"
                  >
                    <button id="edit">
                      <MdEdit />
                    </button>
                  </a>
                </td>
                <td class="px-6 py-4">
                  <a
                    href="#delete"
                    class="font-medium ext-gray-700 dark:text-blue-500 hover:underline"
                  >
                    <button id="delete">
                      <RiDeleteBinFill />
                    </button>
                  </a>
                </td>
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

export default SortingTable;
