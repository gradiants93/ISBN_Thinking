import React from "react";
import "./burger.css";
// import { NavLink } from "./NavbarElements";
import { NavLink } from "react-router-dom";
import { slide as BurgerMenu } from "react-burger-menu";

const NavBurger = () => {
  return (
    <BurgerMenu>
      <NavLink className={"burger"} exact to="/">
        HOME
      </NavLink>
      <NavLink className={"burger"} to="/books">
        BOOKS
      </NavLink>
      <NavLink className={"burger"} to="/addnewbook">
        ADD A BOOK
      </NavLink>
      <NavLink className={"burger"} to="/search">
        SEARCH
      </NavLink>
    </BurgerMenu>
  );
};

export default NavBurger;
