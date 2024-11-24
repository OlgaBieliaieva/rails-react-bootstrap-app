import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import SignUpForm from "./SignUpForm";

const SignUpModal = ({ onClose }) => {
  return (
    <>
      <ModalHeader>
        <ModalTitle>Sign up</ModalTitle>
        <CloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody className="px-5">
        <SignUpForm onClose={onClose} />
      </ModalBody>
      <ModalFooter>
        <p>Already have an account?</p>
        <span>Sign in</span>
      </ModalFooter>
    </>
  );
};
export default SignUpModal;
