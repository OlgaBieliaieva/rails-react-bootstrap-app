import React from "react";

export const SignUpButton = ({ action, text }) => {
  return (
    <button
      type="button"
      onClick={action}
      className="px-3 py-1 border-0 rounded-pill bg-dark text-light"
    >
      {text}
    </button>
  );
};

export const SignInButton = ({ action, text }) => {
  return (
    <button
      type="button"
      onClick={action}
      className="px-3 py-1 border-0 rounded-pill bg-light text-dark"
    >
      {text}
    </button>
  );
};

export const AddButton = ({ action, text }) => {
  return (
    <button
      type="button"
      onClick={action}
      className="px-3 py-2 border-2 border-light rounded-pill bg-transparent text-light text-uppercase"
    >
      {text}
    </button>
  );
};

export const SubmitFormButton = ({ action, text }) => {
  return (
    <button
      type="button"
      onClick={action}
      className="px-3 py-2 border-2 border-dark rounded-pill bg-transparent text-dark text-uppercase"
    >
      {text}
    </button>
  );
};
