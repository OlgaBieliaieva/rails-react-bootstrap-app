
import React from "react";
import { SignUpButton } from "./Buttons";
import { SignInButton } from "./Buttons";

const Authbar = () => {
 
  return (
    <div className="p-1 d-flex align-items-center justify-content-center gap-2 bg-light rounded-pill">      
      <SignInButton text="Sign in" />
      <SignUpButton text="Sign up" />
    </div>
  );
};
export default Authbar;
