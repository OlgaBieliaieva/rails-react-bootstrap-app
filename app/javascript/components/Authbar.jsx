import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import { SignUpButton } from "./Buttons";
import { SignInButton } from "./Buttons";
import MainModal from "./MainModal";
import SignUpModal from "./SignUpModal";

const Authbar = () => {
    const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const openSignInModal = () => setIsSignIn(true);
  const closeSignInModal = () => setIsSignIn(false);

  const openSignUpModal = () => setIsSignUp(true);
  const closeSignUpModal = () => setIsSignUp(false);

  return (
    <>
      <div className="p-1 d-flex align-items-center justify-content-center gap-2 bg-light rounded-pill">
        <SignInButton text="Sign in" action={openSignInModal}/>
        <SignUpButton text="Sign up" action={openSignUpModal}/>
      </div>
      <MainModal isOpen={isSignUp} onClose={closeSignUpModal}>
        <SignUpModal onClose={closeSignUpModal}/>        
      </MainModal>
    </>
  );
};
export default Authbar;
