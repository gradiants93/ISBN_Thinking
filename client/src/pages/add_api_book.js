import React, { useState } from "react";

const AddApiBook = () => {
  // Initial book
  const initialBook = {
    title: "",
    author_f: "",
    author_l: "",
    format: "",
    owned: "",
    read: "",
    isbn: "",
  };

  // We're using that initial book as our initial state
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState();
  const [apiRes, setAPIRes] = useState(false);
  const str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  // user input ISBN
  const [isbn, setIsbn] = useState();
  let imgURL = "";

  const handleUSERISBNChange = (event) => {
    const isbn = event.target.value;
    setIsbn(isbn);
  };

  //create functions that handle the event of the user typing into the form
  const handleChange = (event, fieldName, isBoolean = false) => {
    const parsedValue = isBoolean
      ? str2bool(event.target.value)
      : event.target.value;
    setBook((book) => ({ ...book, [fieldName]: parsedValue }));
  };

  //   //A function to handle the post request
  //   const postNewBook = (newBook) => {
  //     return fetch("/api/newbook", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newBook),
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("From the post ", data);
  //       });
  //   };

  // The handle submit function now needs logic for adding to DB and using correct ids
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
    // postNewBook(book);
  };

  // send request for metadata to classify
  const handleGET = (e) => {
    e.preventDefault();
    console.log(`Query classify for ${isbn}`);
    setAPIRes(false);
    fetch(`/api/request?isbn=${isbn}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setBooks(json);
        console.log(json.length);
        console.log(imgURL);
        setAPIRes(true);
      })
      .catch((err) => console.error(`Error: ${err}`));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "Right",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Add API Book</h2>
      <label>
        <input
          type="text"
          id="user-isbn-input"
          onChange={handleUSERISBNChange}
        />{" "}
        Search ISBN
      </label>
      <button onClick={handleGET}>Search for book</button>

      <div className="APIbook">
        <h2> API Return </h2>
        <ul>
          {apiRes ? (
            books.length ? (
              books.map((el, index) => (
                <li key={index}>
                  <img src={imgURL} />
                  <strong>Title:</strong> {el.title}
                  <br />
                  <strong>Format:</strong> {el.format}
                  <br />
                  <strong>Author:</strong> {el.author}
                  <br />
                  <button type="button">Add book?</button>
                </li>
              ))
            ) : (
              <>
                <img src={imgURL} />
                <li key={1}>
                  <strong>Title:</strong> {books.title} <br />
                  <strong>Author:</strong>
                  {books.author} <br />
                  <strong>Format:</strong> {books.format}
                  <br />
                  <button type="button">Add book?</button>
                </li>
              </>
            )
          ) : null}{" "}
        </ul>
      </div>
    </div>
  );
};

export default AddApiBook;
