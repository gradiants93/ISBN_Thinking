import { useState } from "react";

const Form = (props) => {
  // Initial book in case that you want to update a new book
  const {
    initialBook = {
      id: null,
      author_f: "",
      author_l: "",
      format: "",
      owned: "",
      read: "",
    },
  } = props;

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
    // const owned = event.target.value;
    console.log(str2bool(event.target.value));
    const owned = str2bool(event.target.value);
    // console.log(owned);
    setBook((book) => ({ ...book, owned }));
  };

  const handleReadChange = (event) => {
    const read = event.target.value;
    setBook((book) => ({ ...book, read }));
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
        <p>
          <fieldset style={{ display: "inline" }}>
            <legend>Owned?</legend>
            <label>
              <input
                type="radio"
                name="owned"
                value="true"
                checked={book.owned === true}
                onChange={handleOwnedChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="owned"
                value="false"
                checked={book.owned === false}
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
                required
                value={book.read}
                onChange={handleReadChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="read"
                required
                value={book.read}
                onChange={handleReadChange}
              />
              No
            </label>
          </fieldset>
        </p>
        <button type="submit">{!book.id ? "Add" : "Save"}</button>
      </form>
    </div>
  );
};

export default Form;
