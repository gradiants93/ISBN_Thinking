import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: rgb(1, 50, 61);
  // above background bar color
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
`;

export const NavLink = styled(Link)`
  color: rgb(225, 221, 227);
  // above color of links
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  white-spance: nowrap;
  font-family: "Marcellus", serif;
  &.active {
    font-weight: bold;
    color: #fbb917;
  }
  &:hover {
    font-size: 1.75rem;
  }
  @media screen and (min-width: 350px) {
    font-size: 1.5rem;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #e4d9ff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
