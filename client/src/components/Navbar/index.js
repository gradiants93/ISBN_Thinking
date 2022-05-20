import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink exact to="/">
            HOME
          </NavLink>
          <NavLink to="/books">BOOKS</NavLink>
          <NavLink to="/addnewbook">ADD A BOOK</NavLink>
          <NavLink to="/search">SEARCH</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
