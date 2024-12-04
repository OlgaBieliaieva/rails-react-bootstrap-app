import React, { useContext, useState } from "react";
import { UserContext } from "../components/userContext";
import MainModal from "./MainModal";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { AddLinkButton } from "./Buttons";
import { AddButton } from "./Buttons";

const AddRecipe = ({ user }) => {
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
      {user ? (
        <AddLinkButton path={"/recipe/new"} text="Add recipe" />
      ) : (
        <AddButton action={openSignInModal} text="Add recipe" />
      )}

      <MainModal isOpen={isSignIn} onClose={closeSignInModal}>
        <SignInModal onClose={closeSignInModal} onChange={openSignUpModal} />
      </MainModal>
      <MainModal isOpen={isSignUp} onClose={closeSignUpModal}>
        <SignUpModal onClose={closeSignUpModal} onChange={openSignInModal} />
      </MainModal>
    </>
  );
};
export default AddRecipe;
