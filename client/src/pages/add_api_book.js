import React, { useState } from "react";

const AddApiBook = () => {
  const [books, setBooks] = useState([]);
  const [indBook, setIndBook] = useState();
  const [apiRes, setAPIRes] = useState(false);
  const [dbRes, setDBRes] = useState(false);
  // user input ISBN
  const [isbn, setIsbn] = useState();
  const [showRec, setShowRec] = useState(false);

  // Query DB for specific book/format and make new records if needed
  const queryDB = async (title, author_last, author_first, format) => {
    const response = await fetch(
      `/api/findbook/${title}/${indBook.isbn}/${format}/${author_first}/${author_last}`,
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
    setIndBook(() => ({
      ...indBook,
      ...newResponse,
    }));
    if (data.id === undefined) {
      setDBRes(true);
      //   console.log("Dont have record ", indBook);
    } else {
      setIndBook(() => ({
        ...indBook,
        ...newResponse,
      }));
      alert("You already own that book");
      setAPIRes(false);
      setShowRec(true);
    }
  };

  // Query DB for needed FK ids and create new user coll record
  const createUserColl = async () => {
    console.log(indBook);
    const response = await fetch(
      `/api/createusercoll/${indBook.title}/${indBook.isbn}/${indBook.format}/${indBook.author_first}/${indBook.author_last}/${indBook.owned}/${indBook.read}/${indBook.book_id}/${indBook.book_format_id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log("From the post createUserColl", data);
    setIndBook(() => ({
      ...data,
      author_first: data.author_first,
      author_last: data.author_last,
      read: bool2str(data.read),
      owned: bool2str(data.owned),
    }));
    setDBRes(false);
    setAPIRes(false);
    setShowRec(true);
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
      if (value === true) return "Yes";
      if (value === false) return "No";
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
    setIndBook(() => ({
      ...indBook,
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
    setIndBook(() => ({
      ...indBook,
      ...newBook,
    }));
    console.log(newBook);
    queryDB(title, author_last, author_first, format);
  };

  // send request for metadata to classify
  const handleGET = (e) => {
    e.preventDefault();
    setIndBook((state) => ({ ...state, isbn: isbn }));
    console.log(`Query classify for ${isbn}`);
    setDBRes(false);
    setAPIRes(false);
    setShowRec(false);
    fetch(`/api/request?isbn=${isbn}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json, " classify response");
        setBooks(() => json);
        setAPIRes(true);
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
        alert(
          `Could not find any works for ISBN: ${isbn}. Please check the ISBN and try again`
        );
      });
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
        {apiRes ? (
          // Show on API response
          <>
            <h2> API Return </h2>
            {books.length ? (
              // Multiple work response
              books.map((el, index) => (
                <div className="multi-book" key={index}>
                  <p>
                    {/* Need to move images to left and text to right */}
                    <img
                      src={`https://covers.openlibrary.org/b/isbn/${indBook.isbn}-S.jpg`}
                      alt={`${el.title} cover`}
                    />
                    <br />
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
              // Single work response
              <>
                <div className="single-book" key={1}>
                  <p>
                    <img
                      src={`https://covers.openlibrary.org/b/isbn/${indBook.isbn}-M.jpg`}
                      alt={`${books.title} cover`}
                    />
                    <br />
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
            )}
          </>
        ) : null}{" "}
        {showRec ? (
          // show on have record
          <>
            <h3>Your Book Record</h3>
            <img
              src={`https://covers.openlibrary.org/b/isbn/${indBook.isbn}-M.jpg`}
              alt={`${indBook.title} cover`}
            />
            <p>
              <strong>Title:</strong> {indBook.title} <br />
              <strong>Author:</strong> {indBook.author_first}{" "}
              {indBook.author_last}
              <br />
              <strong>Format:</strong> {indBook.format} <br />
              <strong>Owned:</strong> {indBook.owned} <br />
              <strong>Read:</strong> {indBook.read}
            </p>
          </>
        ) : null}
        {dbRes ? (
          // Show on do not have record and need to add to coll record
          <>
            <form onSubmit={handleSubmit}>
              <div>
                <fieldset style={{ display: "inline" }}>
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
                <fieldset style={{ display: "inline" }}>
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
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AddApiBook;
