import React, { useState } from "react";

const AddNewBook = () => {
  // Initial book
  const initialBook = {
    title: "",
    author_first: "",
    author_last: "",
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
  const handleChange = (event, isBoolean = false) => {
    const parsedValue = isBoolean
      ? str2bool(event.target.value)
      : event.target.value;
    setBook((book) => ({
      ...book,
      [event.target.dataset.fieldname]: parsedValue,
    }));
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
    <div className="component-page">
      <h1>Add a Book</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Title
              <input
                type="text"
                data-fieldname="title"
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
                data-fieldname="author_last"
                placeholder="Author Last Name"
                required
                value={book.author_last}
                onChange={handleChange}
              />
            </label>
            <label>
              {" "}
              Author First
              <input
                type="text"
                data-fieldname="author_first"
                placeholder="Author First and Middle Name"
                required
                value={book.author_first}
                onChange={handleChange}
              />
            </label>
            {/* Add ISBN validation (also auto remove "-") */}
            <label>
              {" "}
              ISBN-13
              <input
                type="text"
                data-fieldname="isbn"
                placeholder="ISBN-13"
                required
                value={book.isbn}
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <fieldset className="radio-form" style={{ display: "inline" }}>
            <legend>Format?</legend>
            <label>
              <input
                type="radio"
                name="format"
                required
                data-fieldname="format"
                value="eBook"
                onChange={handleChange}
              />
              eBook
            </label>
            <label>
              <input
                type="radio"
                name="format"
                data-fieldname="format"
                value="Book"
                onChange={handleChange}
              />
              Book
            </label>
            <label>
              <input
                type="radio"
                name="format"
                data-fieldname="format"
                value="Audiobook"
                onChange={handleChange}
              />
              Audiobook
            </label>
          </fieldset>
          <fieldset className="radio-form" style={{ display: "inline" }}>
            <legend>Owned?</legend>
            <label>
              <input
                type="radio"
                name="owned"
                data-fieldname="owned"
                value="true"
                onChange={(e) => {
                  handleChange(e, true);
                }}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="owned"
                data-fieldname="owned"
                value="false"
                onChange={(e) => {
                  handleChange(e, true);
                }}
              />
              No
            </label>
          </fieldset>
          <fieldset className="radio-form" style={{ display: "inline" }}>
            <legend> Read?</legend>
            <label>
              <input
                type="radio"
                name="read"
                data-fieldname="read"
                value="true"
                onChange={(e) => {
                  handleChange(e, true);
                }}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="read"
                data-fieldname="read"
                value="false"
                onChange={(e) => {
                  handleChange(e, true);
                }}
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
