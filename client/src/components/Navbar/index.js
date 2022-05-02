import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: "bold",
              color: "darkgreen",
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            activeStyle={{
              fontWeight: "bold",
              color: "darkgreen",
            }}
          >
            Books
          </NavLink>
          <NavLink
            to="/addnewbook"
            activeStyle={{
              fontWeight: "bold",
              color: "darkgreen",
            }}
          >
            Add A Book
          </NavLink>
          <NavLink
            to="/search"
            activeStyle={{
              fontWeight: "bold",
              color: "darkgreen",
            }}
          >
            Search
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn></NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
