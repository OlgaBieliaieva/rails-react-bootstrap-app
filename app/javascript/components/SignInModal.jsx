import React from "react";
import {
  CloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import { LinkButton } from "./Buttons";
// import SignUpForm from "./SignUpForm";

const SignInModal = ({ onClose, onChange }) => {
  return (
    <>
      <ModalHeader>
        <ModalTitle>Sign in</ModalTitle>
        <CloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody className="px-5">
        {/* <SignUpForm onClose={onClose} /> */}
      </ModalBody>
      <ModalFooter>
        <p>Have no account?</p>
        <LinkButton text="Sign up" action={onChange} />
      </ModalFooter>
    </>
  );
};
export default SignInModal;
