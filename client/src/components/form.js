import { useState } from "react";

const Form = (props) => {
  // Initial book in case that you want to update a new book
  const {
    initialBook = {
      id: null,
      author_first: "",
      author_last: "",
      format: "",
      owned: "",
      read: "",
    },
  } = props;

  // We're using that initial book as our initial state
  const [book, setBook] = useState(initialBook);
  const str2bool = (value) => {
    if (value && typeof value === "string") {
      return value.toLowerCase();
    }
    return value;
  };
  //create functions that handle the event of the user typing into the form
  const handleChange = (event) => {
    const parsedValue = str2bool(event.target.value);
    setBook((book) => ({
      ...book,
      [event.target.dataset.fieldname]: parsedValue,
    }));
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
        props.saveBook(data);
      });
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
        props.saveBook(data);
      });
  };

  // Than handle submit function now needs the logic for the update scenario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (book.id) {
      updateBook(book);
    } else {
      postBook(book);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="radio-form">
          <legend>Owned?</legend>
          <label>
            <input
              type="radio"
              fata-fieldname="owned"
              name="owned"
              value="true"
              checked={book.owned === true}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              data-fieldname="owned"
              name="owned"
              value="false"
              checked={book.owned === false}
              onChange={handleChange}
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
              checked={book.read === true}
              onChange={handleChange}
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
              checked={book.read === false}
              onChange={handleChange}
            />
            No
          </label>
        </fieldset>
        <button type="submit">{!book.id ? "Add" : "Save"}</button>
      </form>
    </div>
  );
};

export default Form;
