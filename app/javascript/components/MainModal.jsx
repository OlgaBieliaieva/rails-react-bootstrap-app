import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "react-bootstrap";

const MainModal = ({ isOpen, onClose, children }) => {
  return ReactDOM.createPortal(
    <Modal show={isOpen} onHide={onClose}>
      {children}
    </Modal>,
    document.getElementById("modal")
  );
};

export default MainModal;
