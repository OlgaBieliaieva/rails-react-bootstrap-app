import React from "react";
import { Link } from "react-router-dom";

const Logo = () => (
  <Link
    to={`/`}
    className="link-underline link-underline-opacity-0 text-light fw-bold fs-2"
  >
    Recipes
  </Link>
);
export default Logo;
