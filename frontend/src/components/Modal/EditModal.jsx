// Example of EditModal.jsx
import React from "react";

const EditModal = ({ selectedRow, onClose }) => {
  if (!selectedRow) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Display the details of the selected row */}
        <h2>Edit Row Details</h2>
        <p>ID: {selectedRow.id}</p>
        <p>Name: {selectedRow.name}</p>
        {/* Add more fields as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditModal;
