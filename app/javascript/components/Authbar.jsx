import React, { useState } from "react";
import { Modal } from "bootstrap";
import { SignUpButton } from "./Buttons";
import { SignInButton } from "./Buttons";
// import Popup from "./Modal";

const Authbar = () => {
  const [signUp, setSignUp] = useState(false);
  // const popup = new Modal(document.getElementById('popup'));

  // const openSignUpModal = () => popup.show();
  // const closeSignUpModal = () => popup.hide();

  return (
    <>
      <div className="p-1 d-flex align-items-center justify-content-center gap-2 bg-light rounded-pill">
        <SignInButton text="Sign in" />
        <SignUpButton text="Sign up" />
      </div>
      {/* <Popup  */}
      {/* isOpen={signUp}  */}
      {/* onClose={closeSignUpModal}> */}
        {/* <h1 className="text-light">Hello world</h1> */}
      {/* </Popup> */}
    </>
  );
};
export default Authbar;
