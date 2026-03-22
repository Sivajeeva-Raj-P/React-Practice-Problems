import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <ul className="nav nav-tabs mb-4 justify-content-center">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">
          Contact
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
