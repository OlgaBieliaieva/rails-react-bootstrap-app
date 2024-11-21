import React from "react";
import { Link } from "react-router-dom";

const Logo = () => (
  <Link to={`/`} className="fw-bold fs-2 btn text-light">
    Recipes
  </Link>
);
export default Logo;
