import React, { useState } from "react";

const AddBook = () => {
  // Initial book
  const initialBook = {
    author_f: "",
    author_l: "",
    format: "",
    owned: "",
    read: "",
  };

  // We're using that initial book as our initial state
  const [book, setBook] = useState(initialBook);
  const str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  //create functions that handle the event of the user typing into the form
  const handleOwnedChange = (event) => {
    // console.log(str2bool(event.target.value));
    const owned = str2bool(event.target.value);
    setBook((book) => ({ ...book, owned }));
  };

  const handleFormatChange = (event) => {
    const format = event.target.value;
    setBook((book) => ({ ...book, format }));
  };

  const handleReadChange = (event) => {
    const read = str2bool(event.target.value);
    setBook((book) => ({ ...book, read }));
  };

  const handleAuthorFChange = (event) => {
    const author_f = event.target.value;
    setBook((book) => ({ ...book, author_f }));
  };

  const handleAuthorLChange = (event) => {
    const author_l = event.target.value;
    setBook((book) => ({ ...book, author_l }));
  };
  const handleTitleChange = (event) => {
    const title = event.target.value;
    setBook((book) => ({ ...book, title }));
  };

  //A function to handle the post request
  const postBook = (newBook) => {
    return fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
      });
  };

  // Than handle submit function now needs the logic for the update scenario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
    // postBook(book);
  };
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
      <h1>Add a Book</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Title
              <input
                type="text"
                id="add-book-title"
                placeholder="Title"
                required
                value={book.title}
                onChange={handleTitleChange}
              />
            </label>
            <label>
              {" "}
              Author Last
              <input
                type="text"
                id="add-authorL"
                placeholder="Author Last Name"
                required
                value={book.author_l}
                onChange={handleAuthorLChange}
              />
            </label>
            <label>
              {" "}
              Author First
              <input
                type="text"
                id="add-authorF"
                placeholder="Author First Name"
                required
                value={book.author_f}
                onChange={handleAuthorFChange}
              />
            </label>
          </fieldset>
          <fieldset style={{ display: "inline" }}>
            <legend>Format?</legend>
            <label>
              <input
                type="radio"
                name="format"
                value="eBook"
                onChange={handleFormatChange}
              />
              eBook
            </label>
            <label>
              <input
                type="radio"
                name="format"
                value="Book"
                onChange={handleFormatChange}
              />
              Book
            </label>
            <label>
              <input
                type="radio"
                name="format"
                value="Audiobook"
                onChange={handleFormatChange}
              />
              Audiobook
            </label>
          </fieldset>
          <fieldset style={{ display: "inline" }}>
            <legend>Owned?</legend>
            <label>
              <input
                type="radio"
                name="owned"
                value="true"
                onChange={handleOwnedChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="owned"
                value="false"
                onChange={handleOwnedChange}
              />
              No
            </label>
          </fieldset>
          <fieldset style={{ display: "inline" }}>
            <legend> Read?</legend>
            <label>
              <input
                type="radio"
                name="read"
                value="true"
                onChange={handleReadChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="read"
                value="false"
                onChange={handleReadChange}
              />
              No
            </label>
          </fieldset>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
