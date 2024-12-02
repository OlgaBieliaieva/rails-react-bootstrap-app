import React from "react";
import {
  CloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import { LinkButton } from "./Buttons";
import SignInForm from "./SignInForm";

const SignInModal = ({ onClose, onChange }) => {
  return (
    <>
      <ModalHeader>
        <ModalTitle>Sign in</ModalTitle>
        <CloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody className="px-5">
        <SignInForm onClose={onClose} />
      </ModalBody>
      <ModalFooter>
        <p>Have no account?</p>
        <LinkButton text="Sign up" action={onChange} />
      </ModalFooter>
    </>
  );
};
export default SignInModal;
