import React from "react";

export const SignUpButton = ({ onClick, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1 border-0 rounded-pill bg-dark text-light"
    >
      {text}
    </button>
  );
};

export const SignInButton = ({ onClick, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1 border-0 rounded-pill bg-light text-dark"
    >
      {text}
    </button>
  );
};

export const AddButton = ({ onClick, text }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className="px-3 py-2 border-2 border-light rounded-pill bg-transparent text-light text-uppercase"
      >
        {text}
      </button>
    );
  };

  
