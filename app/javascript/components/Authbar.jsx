import React, { useState } from "react";
import { SignUpButton } from "./Buttons";
import { SignInButton } from "./Buttons";
import MainModal from "./MainModal";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

const Authbar = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const openSignInModal = () => {
    setIsSignUp(false);
    setIsSignIn(true);
  };
  const closeSignInModal = () => setIsSignIn(false);

  const openSignUpModal = () => {
    setIsSignIn(false);
    setIsSignUp(true);
  };
  const closeSignUpModal = () => setIsSignUp(false);

  return (
    <>
      <div className="p-1 d-flex align-items-center justify-content-center gap-2 bg-light rounded-pill">
        <SignInButton text="Sign in" action={openSignInModal} />
        <SignUpButton text="Sign up" action={openSignUpModal} />
      </div>
      <MainModal isOpen={isSignUp} onClose={closeSignUpModal}>
        <SignUpModal onClose={closeSignUpModal} onChange={openSignInModal} />
      </MainModal>
      <MainModal isOpen={isSignIn} onClose={closeSignInModal}>
        <SignInModal onClose={closeSignInModal} onChange={openSignUpModal} />
      </MainModal>
    </>
  );
};
export default Authbar;
