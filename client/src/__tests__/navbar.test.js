import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";
import BookList from "../components/book_list";

afterEach(cleanup);

describe("App", () => {
  test("renders Navbar", () => {
    render(<App />);
    expect(screen.getAllByText(/ADD A BOOK/i)[0]).toBeInTheDocument();
  });
});
describe("Book list", () => {
  test("filter buttons show up", () => {
    render(<BookList />);
    expect(screen.getByText(/Haven't Read/i)).toBeInTheDocument();
  });
});
