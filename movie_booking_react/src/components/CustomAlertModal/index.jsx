import React from 'react';
import Modal from 'react-modal';

const CustomAlertModal = ({ isOpen, onClose, message, displayBookingSummary, onViewBookingSummary }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Custom Alert Modal"
      ariaHideApp={false}
      className="modal-dialog modal-dialog-centered"
    >
      <div className="modal-content">
        <div className="modal-header bg-info text-white">
          <h4 className="modal-title">Alert</h4>
          <button type="button" className="close" onClick={onClose}>
            <span>&#x2716;</span>
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "19px" }}>{message}</p>
        </div>
        <div className="modal-footer">
          {displayBookingSummary && (
            <button type='button' className="btn btn-primary" onClick={onViewBookingSummary}>
              View Booking Summary
            </button>
          )}
          <button type="button" className="btn btn-danger" onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomAlertModal;
