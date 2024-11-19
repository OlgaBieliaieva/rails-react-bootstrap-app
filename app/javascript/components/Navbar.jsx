import React from "react";
import { Link } from "react-router-dom";

const Navbar
 = () => (
  <nav className="d-flex gap-3 align-items-center">
    <Link to="/">Home</Link>
    <Link to="/recipe">Add recipe</Link>
  </nav>
);

export default Navbar;