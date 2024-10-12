import React, { useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { useStateContext } from "../../contexts/ContextProvider";
import { COLUMNS } from "./columns";
import { Checkbox } from "./Checkbox";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaSort } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import FormDelete from "../Forms/FormDelete";
import CustomModal from "../Modal/CustomModal";
import "./table.css";

const TableSelection = ({ title, dataSource }) => {
  const columns = useMemo(() => {
    const selectedColumns = COLUMNS.find((group) => group.title === title);
    return selectedColumns ? selectedColumns.columns : [];
  }, [title]);
  const data = useMemo(() => dataSource, []);
  const { isShowingDelete, toggleDelete } = useStateContext();

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
    selectedFlatRows,
    state: { filters },
  } = useTable(
    { columns, data },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  const { pageIndex, pageSize } = state;
  const [selectedRow, setSelectedRow] = useState(null);

  const handleViewDetail = (rowData) => {
    setSelectedRow(rowData);
  };
  const handleCloseModal = () => {
    setSelectedRow(null);
  };
  //   const firstPageRows = rows.slice(0, 10);

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
                    className={index === 1 ? "first-column" : ""}
                  >
                    {column.render("Header")}
                    {index !== 0 && index !== 1 && (
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
                {/* <th>ACTION</th> */}
              </tr>
              <tr>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))}
                {/* <th></th> */}
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
                {/* <td className="px-4 py-4 w-24">
                  <div className="flex justify-center items-center">
                    <a
                      href="#edit"
                      className="font-medium text-gray-700 dark:text-blue-500 hover:underline"
                      onClick={() => handleViewDetail(row.original)}
                    >
                      <button id="edit" className="text-lg pr-2">
                        <MdEdit />
                      </button>
                    </a>
                    <a
                      href="#delete"
                      className="font-medium text-gray-700 dark:text-blue-500 hover:underline"
                    >
                      <button
                        id="delete"
                        className="text-lg pl-2"
                        onClick={toggleDelete}
                      >
                        <RiDeleteBinFill />
                      </button>
                    </a>
                  </div>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
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
export default TableSelection;
