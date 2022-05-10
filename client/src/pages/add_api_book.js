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
  const [dbRes, setDBRes] = useState(false);
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
    setBook((book) => ({ ...book, isbn: isbn }));
  };

  //create functions that handle the event of the user typing into the form
  const handleChange = (event, fieldName, isBoolean = false) => {
    const parsedValue = isBoolean
      ? str2bool(event.target.value)
      : event.target.value;
    setBook((book) => ({ ...book, [fieldName]: parsedValue }));
    console.log(book);
  };

  // Query to see if have this specific book/format
  const queryBook = ({ title, format, isbn, author_f, author_l }) => {
    console.log(book); // query sends correct info
    return fetch(
      `/api/findbook/${title}/${isbn}/${format}/${author_f}/${author_l}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        if (data === "Choose the formats owned and read") {
          //redirect?
          setDBRes(true);
        }
      });
  };

  const createUserColl = ({
    title,
    format,
    isbn,
    author_f,
    author_l,
    owned,
    read,
  }) => {
    return fetch(
      `/api/createusercoll/${title}/${isbn}/${format}/${author_f}/${author_l}/${owned}/${read}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        // console.log(response.json());
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
      });
  };

  // The handle submit function now needs logic for adding to DB and using correct ids
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
    // createUserColl(book);
    setDBRes(false);
  };

  const handleClick = (e) => {
    const author_l = e.target.dataset.author.split(", ")[0];
    const author_f = e.target.dataset.author.split(", ")[1];
    const title = e.target.dataset.title;
    const format = e.target.dataset.format;

    setBook((book) => ({
      ...book,
      author_l: author_l,
      author_f: author_f,
      title: title,
      format: format,
    }));
    queryBook(book);
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
        {apiRes ? (
          books.length ? (
            books.map((el, index) => (
              <div className="single-book" key={index}>
                <p>
                  <img src={imgURL} />
                  <strong>Title:</strong> {el.title}
                  <br />
                  <strong>Format:</strong> {el.format}
                  <br />
                  <strong>Author:</strong> {el.author}
                  <br />
                </p>
                <button
                  type="button"
                  data-title={el.title}
                  data-author={el.author}
                  data-format={el.format}
                  onClick={handleClick}
                >
                  Add book?
                </button>
              </div>
            ))
          ) : (
            <>
              <div className="singlebook" key={1}>
                <p>
                  <img src={imgURL} />
                  <strong>Title:</strong> {books.title} <br />
                  <strong>Author:</strong>
                  {books.author} <br />
                  <strong>Format:</strong> {books.format}
                  <br />
                </p>
                <button
                  type="button"
                  data-title={books.title}
                  data-author={books.author}
                  data-format={books.format}
                  onClick={handleClick}
                >
                  Add book?
                </button>
              </div>
            </>
          )
        ) : null}{" "}
        {dbRes ? (
          <>
            <form onSubmit={handleSubmit}>
              <div>
                <fieldset style={{ display: "inline" }}>
                  <legend>Owned?</legend>
                  <label>
                    <input
                      type="radio"
                      fieldName="owned"
                      name="owned"
                      required
                      value="true"
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      fieldName="owned"
                      required
                      name="owned"
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
                      name="read"
                      required
                      value="true"
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="read"
                      fieldName="read"
                      required
                      value="false"
                      onChange={handleChange}
                    />
                    No
                  </label>
                </fieldset>
              </div>
              <button type="submit">Add</button>
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AddApiBook;
