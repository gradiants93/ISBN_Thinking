import React, { useState } from "react";

const AddNewBook = () => {
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
  const [book, setBook] = useState(initialBook);
  const str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  //create functions that handle the event of the user typing into the form
  const handleChange = (event, fieldName, isBoolean = false) => {
    const parsedValue = isBoolean
      ? str2bool(event.target.value)
      : event.target.value;
    setBook((book) => ({ ...book, [fieldName]: parsedValue }));
  };

  //A function to handle the post request
  const postNewBook = (newBook) => {
    return fetch("/api/newbook", {
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

  // The handle submit function now needs logic for adding to DB and using correct ids
  const handleSubmit = (e) => {
    e.preventDefault();
    postNewBook(book);
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
      <h1>Add a Book</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Title
              <input
                type="text"
                fieldName="title"
                placeholder="Title"
                required
                value={book.title}
                onChange={handleChange}
              />
            </label>
            <label>
              {" "}
              Author Last
              <input
                type="text"
                fieldName="author_l"
                placeholder="Author Last Name"
                required
                value={book.author_l}
                onChange={handleChange}
              />
            </label>
            <label>
              {" "}
              Author First
              <input
                type="text"
                fieldName="author_f"
                placeholder="Author First and Middle Name"
                required
                value={book.author_f}
                onChange={handleChange}
              />
            </label>
            {/* Add ISBN validation (also auto remove "-") */}
            <label>
              {" "}
              ISBN-13
              <input
                type="text"
                fieldName="isbn"
                placeholder="ISBN-13"
                required
                value={book.isbn}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <fieldset style={{ display: "inline" }}>
            <legend>Format?</legend>
            <label>
              <input
                type="radio"
                fieldName="format"
                value="eBook"
                onChange={handleChange}
              />
              eBook
            </label>
            <label>
              <input
                type="radio"
                fieldName="format"
                value="Book"
                onChange={handleChange}
              />
              Book
            </label>
            <label>
              <input
                type="radio"
                fieldName="format"
                value="Audiobook"
                onChange={handleChange}
              />
              Audiobook
            </label>
          </fieldset>
          <fieldset style={{ display: "inline" }}>
            <legend>Owned?</legend>
            <label>
              <input
                type="radio"
                fieldName="owned"
                value="true"
                onChange={handleChange}
                // change to pass bool
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                fieldName="owned"
                value="false"
                onChange={handleChange}
              />
              No
            </label>
          </fieldset>
          <fieldset style={{ display: "inline" }}>
            <legend> Read?</legend>
            <label>
              <input
                type="radio"
                fieldName="read"
                value="true"
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                fieldName="read"
                value="false"
                onChange={handleChange}
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

export default AddNewBook;
