import { useState } from "react";

const Form = ({ initialBook, refreshBooks }) => {
  // Initial book in case that you want to update a new book

  // We're using that initial book as our initial state
  const [editBook, setEditBook] = useState(initialBook);
  const str2bool = (value) => {
    if (value && typeof value === "string") {
      return value.toLowerCase();
    }
    return value;
  };
  //create functions that handle the event of the user typing into the form
  const handleChange = (event) => {
    const parsedValue = str2bool(event.target.value);
    setEditBook((book) => ({
      ...book,
      [event.target.dataset.fieldname]: parsedValue,
    }));
  };

  //a function to handle the Update request
  const updateBook = (existingBook) => {
    return fetch(`/api/books/${existingBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingBook),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From put request ", data);
        refreshBooks();
      });
  };

  // Than handle submit function now needs the logic for the update scenario
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(editBook);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="radio-form">
          <legend>Owned?</legend>
          <label>
            <input
              type="radio"
              data-fieldname="owned"
              name="owned"
              value="true"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              data-fieldname="owned"
              name="owned"
              value="false"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            No
          </label>
        </fieldset>
        <fieldset className="radio-form">
          <legend> Read?</legend>
          <label>
            <input
              type="radio"
              data-fieldname="read"
              name="read"
              required
              value="true"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              data-fieldname="read"
              name="read"
              required
              value="false"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            No
          </label>
        </fieldset>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Form;
