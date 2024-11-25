import React from "react";
import {
  CloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import { LinkButton } from "./Buttons";
import SignUpForm from "./SignUpForm";

const SignUpModal = ({ onClose, onChange }) => {
  return (
    <>
      <ModalHeader className="position-static">
        <ModalTitle>Sign up</ModalTitle>
        <CloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody className="px-5 position-static">
        <SignUpForm onClose={onClose} />
      </ModalBody>
      <ModalFooter>
        <p>Already have an account?</p>
        <LinkButton text="Sign in" action={onChange} />
      </ModalFooter>
    </>
  );
};
export default SignUpModal;
