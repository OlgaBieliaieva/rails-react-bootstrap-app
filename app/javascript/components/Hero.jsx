import React, { useContext, useState } from "react";
import { UserContext } from "../components/userContext";
import MainModal from "./MainModal";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { AddLinkButton } from "./Buttons";
import { AddButton } from "./Buttons";

const Hero = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { user } = useContext(UserContext);

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
      <section className="w-75 py-5 d-flex flex-column align-items-center justify-content-center gap-4">
        <h1
          className="text-light text-center text-capitalize"
          style={{ fontSize: 56 }}
        >
          Improve your culinary talents
        </h1>
        <p className="text-light text-center fs-4">
          Amazing recipes for beginners in the world of cooking, enveloping you
          in the aromas and tastes of various cuisines.
        </p>
        {user ? (
          <AddLinkButton path={"/recipe/new"} text="Add recipe" />
        ) : (
          <AddButton action={openSignInModal} text="Add recipe" />
        )}
      </section>
      <MainModal isOpen={isSignIn} onClose={closeSignInModal}>
        <SignInModal onClose={closeSignInModal} onChange={openSignUpModal} />
      </MainModal>
      <MainModal isOpen={isSignUp} onClose={closeSignUpModal}>
        <SignUpModal onClose={closeSignUpModal} onChange={openSignInModal} />
      </MainModal>
    </>
  );
};
export default Hero;
