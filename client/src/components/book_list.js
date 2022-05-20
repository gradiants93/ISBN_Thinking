import { useState, useEffect } from "react";
import Form from "./form";

function BookList() {
  //Original state in the parent component so the page will know when to render new books
  const [books, setBooks] = useState([]);

  // State for selected filter
  const [filteredBooks, setFilteredBooks] = useState(null);

  // New state to check if we are working on editing a book
  const [editingBookId, setEditingBookId] = useState(null);

  const loadBooks = () => {
    fetch("/api/books")
      .then((response) => response.json())
      .then((books) => {
        setBooks(books);
      });
  };

  const bool2str = (value) => {
    if (typeof value === "boolean") {
      if (value) return "Yes";
      if (!value) return "No";
    }
    return value;
  };

  // Use effect hook to render the books in the app. This will change any time that our initial state change
  useEffect(() => {
    loadBooks();
  }, []);

  // A function to handle the Delete funtionality
  const onDelete = (book) => {
    return fetch(`/api/books/${book.id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        loadBooks();
      }
    });
  };

  // A function to update the list of books when the user edits a book
  const refreshBooks = () => {
    // setBooks((books) => {
    //   const newBooks = [];
    //   for (let book of books) {
    //     if (book.id === savedBook.id) {
    //       newBooks.push(savedBook);
    //     } else {
    //       newBooks.push(book);
    //     }
    //   }
    //   return newBooks;
    // });
    loadBooks();

    // This line is just to close the form!
    setEditingBookId(null);
  };

  //A function to grab the book.id of the book that we want to edit
  const onEdit = (book) => {
    const editingId = book.id;
    setEditingBookId(editingId);
  };

  return (
    <div className="books">
      <div key={"buttons"}>
        <h3>Sort by:</h3>
        <button
          onClick={() =>
            setFilteredBooks(
              books.filter((event) => event.owned.toString() === "true")
            )
          }
        >
          Owned
        </button>
        <button
          onClick={() =>
            setFilteredBooks(
              books.filter((event) => event.owned.toString() === "false")
            )
          }
        >
          Not Owned
        </button>
        <button
          onClick={() =>
            setFilteredBooks(
              books.filter((event) => event.read.toString() === "true")
            )
          }
        >
          Read
        </button>
        <button
          onClick={() =>
            setFilteredBooks(
              books.filter((event) => event.read.toString() === "false")
            )
          }
        >
          Haven't Read
        </button>
        <button onClick={() => setFilteredBooks(null)}>Reset</button>
      </div>
      <br />
      <hr />
      <br />
      <ul>
        {filteredBooks
          ? filteredBooks.map((book) => {
              if (book.id === editingBookId) {
                return (
                  <div
                    className="individual-book"
                    key={`filter edit ${book.id}`}
                  >
                    <li>
                      <img
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                        alt={`${book.title} cover`}
                      />
                      <p>
                        <strong>Title:</strong> {book.title}
                        <br />
                        <strong>Author:</strong> {book.author_first}{" "}
                        {book.author_last}
                        <br />
                        <strong>Format:</strong> {book.format}
                        <br />
                      </p>
                      <br />
                      <hr />
                      <br />
                    </li>
                    <Form initialBook={book} refreshBooks={refreshBooks} />
                  </div>
                );
              } else {
                return (
                  <div className="individual-book">
                    <li key={`filtered ${book.id}`}>
                      <img
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                        alt={`${book.title} cover`}
                      />
                      <p>
                        <strong>Title:</strong> {book.title}
                        <br />
                        <strong>Author:</strong> {book.author_first}{" "}
                        {book.author_last}
                        <br />
                        <strong>Format:</strong> {book.format}
                        <br />
                        <strong>Owned:</strong> {bool2str(book.owned)}
                        <br />
                        <strong>Read:</strong> {bool2str(book.read)}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          onDelete(book);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(book);
                        }}
                      >
                        Edit
                      </button>
                      <br />
                      <hr />
                      <br />
                    </li>
                  </div>
                );
              }
            })
          : books.map((book) => {
              if (book.id === editingBookId) {
                return (
                  <div className="individual-book" key={`edit ${book.id}`}>
                    <li>
                      <img
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                        alt={`${book.title} cover`}
                      />
                      <p>
                        <strong>Title:</strong> {book.title}
                        <br />
                        <strong>Author:</strong> {book.author_first}{" "}
                        {book.author_last}
                        <br />
                        <strong>Format:</strong> {book.format}
                        <br />
                      </p>
                      <br />
                      <hr />
                      <br />
                    </li>
                    <Form initialBook={book} refreshBooks={refreshBooks} />
                  </div>
                );
              } else {
                return (
                  <div className="individual-book" key={book.id}>
                    <li>
                      <img
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                        alt={`${book.title} cover`}
                      />
                      <p>
                        <strong>Title:</strong> {book.title}
                        <br />
                        <strong>Author:</strong> {book.author_first}{" "}
                        {book.author_last}
                        <br />
                        <strong>Format:</strong> {book.format}
                        <br />
                        <strong>Owned:</strong> {bool2str(book.owned)}
                        <br />
                        <strong>Read:</strong> {bool2str(book.read)}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          onDelete(book);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(book);
                        }}
                      >
                        Edit
                      </button>
                      <br />
                      <hr />
                      <br />
                    </li>
                  </div>
                );
              }
            })}
      </ul>
    </div>
  );
}

export default BookList;
