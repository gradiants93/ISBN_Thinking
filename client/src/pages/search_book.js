import React, { useState } from "react";

const SearchBook = () => {
  const [books, setBooks] = useState([]);
  const [individualBook, setIndividualBook] = useState();
  const [apiResponse, setAPIResponse] = useState(false);
  const [dbResponse, setDBResponse] = useState(false);
  // user input ISBN
  const [isbn, setIsbn] = useState();
  const [showRecord, setShowRecord] = useState(false);

  // Query DB for specific book/format and make new records if needed
  const queryDB = async (title, author_last, author_first, format) => {
    const response = await fetch(
      `/api/findbook/${title}/${individualBook.isbn}/${format}/${author_first}/${author_last}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log("From the post queryBook", data);
    const newResponse = {
      author_first: data.author_first,
      author_last: data.author_last,
      title: data.title,
      format: data.format,
      book_id: data.book_id,
      book_format_id: data.book_format_id,
      read: bool2str(data.read),
      owned: bool2str(data.owned),
    };
    setIndividualBook(() => ({
      ...individualBook,
      ...newResponse,
    }));
    if (data.id === undefined) {
      setDBResponse(true);
      //   console.log("Dont have record ", indBook);
    } else {
      setIndividualBook(() => ({
        ...individualBook,
        ...newResponse,
      }));
      alert("You already own that book");
      setAPIResponse(false);
      setShowRecord(true);
    }
  };

  // Query DB for needed FK ids and create new user coll record
  const createUserColl = async () => {
    console.log(individualBook);
    const response = await fetch(
      `/api/createusercoll/${individualBook.title}/${individualBook.isbn}/${individualBook.format}/${individualBook.author_first}/${individualBook.author_last}/${individualBook.owned}/${individualBook.read}/${individualBook.book_id}/${individualBook.book_format_id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log("From the post createUserColl", data);
    setIndividualBook(() => ({
      ...data,
      author_first: data.author_first,
      author_last: data.author_last,
      read: bool2str(data.read),
      owned: bool2str(data.owned),
    }));
    setDBResponse(false);
    setAPIResponse(false);
    setShowRecord(true);
  };

  // turn strings to bool for owned/read
  const str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };
  // convert bool to Yes/No for showing record to viewer
  const bool2str = (value) => {
    if (typeof value === "boolean") {
      if (value) return "Yes";
      if (!value) return "No";
    }
    return value;
  };

  // handler for isbn ONLY
  const handleUSERISBNChange = (event) => {
    const uisbn = event.target.value;
    setIsbn(uisbn);
  };

  // handler for value selection in forms and setting state
  const handleChange = (event, isBoolean = false) => {
    const parsedValue = isBoolean
      ? str2bool(event.target.value)
      : event.target.value;
    setIndividualBook(() => ({
      ...individualBook,
      [event.target.dataset.fieldname]: parsedValue,
    }));
  };

  // Create new user coll record for queried book
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserColl();
  };

  // Send queryDB and make new records if needed
  const handleClick = (e) => {
    const author_last = e.target.dataset.author.split(", ")[0];
    const author_first = e.target.dataset.author.split(", ")[1];
    const title = e.target.dataset.title;
    const format = e.target.dataset.format;
    const newBook = {
      author_last: author_last,
      author_first: author_first,
      title: title,
      format: format,
    };
    setIndividualBook(() => ({
      ...individualBook,
      ...newBook,
    }));
    queryDB(title, author_last, author_first, format);
  };

  // send request for metadata to classify
  const handleGET = (e) => {
    e.preventDefault();
    setIndividualBook((state) => ({ ...state, isbn: isbn }));
    console.log(`Query classify for ${isbn}`);
    setDBResponse(false);
    setAPIResponse(false);
    setShowRecord(false);
    fetch(`/api/request?isbn=${isbn}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json, " classify response");
        setBooks(() => json);
        setAPIResponse(true);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
        alert(
          `Could not find any works for ISBN: ${isbn}. Please check the ISBN and try again`
        );
      });
  };

  return (
    <div className="component-page">
      <h2>Look for a Book</h2>
      <label>
        <input
          type="text"
          id="user-isbn-input"
          onChange={handleUSERISBNChange}
        />{" "}
        Search by ISBN
      </label>
      <button onClick={handleGET}>Search for book</button>

      <div className="APIbook">
        {apiResponse ? (
          // Show on API response
          <div className="api-response">
            <h2> API Return </h2>
            <hr />
            <br />
            {books.length ? (
              // Multiple work response
              books.map((el, index) => (
                <div className="multi-book" key={index}>
                  <div className="individual-book">
                    <img
                      src={`https://covers.openlibrary.org/b/isbn/${individualBook.isbn}-M.jpg`}
                      height="125em"
                      alt={`${el.title} cover`}
                    />
                    <p>
                      <br />
                      <strong>Title:</strong> {el.title}
                      <br />
                      <strong>Format:</strong> {el.format}
                      <br />
                      <strong>Author:</strong> {el.author}
                      <br />
                      <button
                        type="button"
                        data-title={el.title}
                        data-author={el.author}
                        data-format={el.format}
                        onClick={handleClick}
                      >
                        Add book?
                      </button>
                    </p>
                  </div>
                  <br />
                  <hr />
                  <br />
                </div>
              ))
            ) : (
              // Single work response
              <div className="single-book" key={1}>
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${individualBook.isbn}-M.jpg`}
                  alt={`${books.title} cover`}
                />
                <p>
                  <strong>Title:</strong> {books.title}
                  <br />
                  <strong>Author:</strong> {books.author}
                  <br />
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
                <br />
                <hr />
                <br />
              </div>
            )}
          </div>
        ) : null}

        {showRecord ? (
          // show on have record
          <div className="book-record">
            <h3>Your Book Record</h3>
            <img
              src={`https://covers.openlibrary.org/b/isbn/${individualBook.isbn}-M.jpg`}
              alt={`${individualBook.title} cover`}
            />
            <p>
              <strong>Title:</strong> {individualBook.title}
              <br />
              <strong>Author:</strong> {individualBook.author_first}{" "}
              {individualBook.author_last}
              <br />
              <strong>Format:</strong> {individualBook.format}
              <br />
              <strong>Owned:</strong> {individualBook.owned}
              <br />
              <strong>Read:</strong> {individualBook.read}
            </p>
          </div>
        ) : null}

        {dbResponse ? (
          // Show on do not have record and need to add to coll record
          <form onSubmit={handleSubmit}>
            <div>
              <fieldset className="radio-form">
                <legend>Owned?</legend>
                <label>
                  <input
                    type="radio"
                    data-fieldname="owned"
                    name="owned"
                    required
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
                    data-fieldname="owned"
                    required
                    name="owned"
                    value="false"
                    onChange={(e) => {
                      handleChange(e, true);
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
                    required
                    value="false"
                    onChange={(e) => {
                      handleChange(e, true);
                    }}
                  />
                  No
                </label>
              </fieldset>
            </div>
            <button type="submit">Add</button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBook;
