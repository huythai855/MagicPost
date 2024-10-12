import React from "react";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      style={{
        color: "black",
        fontWeight: "initial",
        fontSize: "14px" /* Set the font size to make it smaller */,
        padding: "4px 6px" /* Set padding to make it thinner */,
      }}
    />
  );
};
