import React from 'react';
import './modal.scss'

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button 
          className="close-button" 
          style={{position: "absolute", background: 'red', color: "white"}} 
          onClick={closeModal}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
