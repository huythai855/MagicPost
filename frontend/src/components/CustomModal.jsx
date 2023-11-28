import React from "react";
import ReactDOM from "react-dom";
import "/Users/ad2/Documents/GitHub/MagicPost/MagicPost/frontend/src/components/CustomModal.css";

const CustomModal = ({ isShowing, hide, children }) =>
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
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
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

export default CustomModal;
