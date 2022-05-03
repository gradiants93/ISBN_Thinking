import React from "react";
import BookList from "../components/book_list";

const Books = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "Right",
        alignItems: "Right",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>List O Books</h1>
      <BookList />
    </div>
  );
};

export default Books;
