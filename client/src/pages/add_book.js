import React from "react";

const AddBook = () => {
  // Initial book
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
    console.log(str2bool(event.target.value));
    const owned = str2bool(event.target.value);
    setBook((book) => ({ ...book, owned }));
  };

  const handleFormatChange = (event) => {
    const read = event.target.value;
    setBook((book) => ({ ...book, read }));
  };

  const handleReadChange = (event) => {
    const read = event.target.value;
    setBook((book) => ({ ...book, read }));
  };

  const handleAuthorFChange = (event) => {
    const read = event.target.value;
    setBook((book) => ({ ...book, read }));
  };

  const handleAuthorLChange = (event) => {
    const read = event.target.value;
    setBook((book) => ({ ...book, read }));
  };
  const handleTitleChange = (event) => {
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

  // Than handle submit function now needs the logic for the update scenario
  const handleSubmit = (e) => {
    e.preventDefault();
    postBook(book);
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
          <p>
            <fieldset>
              <label>
                <input
                  type="text"
                  id="add-book-title"
                  placeholder="Title"
                  required
                  value={book.title}
                  onChange={handleTitleChange}
                />
                Title
              </label>
              <label>
                <input
                  type="text"
                  id="add-authorL"
                  placeholder="Author Last Name"
                  required
                  value={book.author_l}
                  onChange={handleAuthorLChange}
                />
                Author Last
              </label>
              <label>
                <input
                  type="text"
                  id="add-authorF"
                  placeholder="Author First Name"
                  required
                  value={book.author_f}
                  onChange={handleAuthorFChange}
                />
                Author First
              </label>
            </fieldset>
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
    </div>
  );
};

export default AddBook;
