import React from "react";
import ReactDOM from "react-dom";
import "../Modal/CustomModal.css";

const EditModal = ({ isShowing, hide, children, onClose, title }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Sửa {title}
                </h2>
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    hide();
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default EditModal;
