import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/addnewbook">Add A Book</NavLink>
          <NavLink to="/search">Search</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
