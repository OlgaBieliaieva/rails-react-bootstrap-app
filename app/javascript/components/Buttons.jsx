import React from "react";
import { Link } from "react-router-dom";

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

export const AddLinkButton = ({ path, text }) => {
  return (
    <Link
      to={path}
      className="btn px-3 py-2 border-2 border-light rounded-pill bg-transparent text-light text-uppercase"
    >
      {text}
    </Link>
  );
};

export const SubmitFormButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="px-3 py-2 border-2 border-dark rounded-pill bg-transparent text-dark text-uppercase"
    >
      {text}
    </button>
  );
};

export const LinkButton = ({ text, action }) => {
  return (
    <button type="submit" onClick={action} className="btn btn-link p-0 m-0">
      {text}
    </button>
  );
};
