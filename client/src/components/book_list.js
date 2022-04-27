import { useState, useEffect } from "react";
import Form from "./form";

function Book_List() {
  //Original state in the parent component so the page will know when to render new books
  const [books, setBooks] = useState([]);

  // New state to check if we are working on editing a book
  const [editingBookId, setEditingBookId] = useState(null);

  const loadBooks = () => {
    fetch("/api/books")
      .then((response) => response.json())
      .then((books) => {
        setBooks(books);
      });
  };

  // Use effect hook to render the books in the app. This will change any time that our initial state change
  useEffect(() => {
    loadBooks();
  }, []);

  // A function to handle the Delete funtionallity
  const onDelete = (book) => {
    return fetch(`/api/books/${book.id}`, {
      method: "DELETE",
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadBooks();
      }
    });
  };

  // A function to handle the Add a new Book funtionality
  const addBook = (newBook) => {
    //console.log(newBook);
    //postBook(newBook);
    setBooks((books) => [...books, newBook]);
  };

  // A function to update the list of books when the user edits a book
  const updateBook = (savedBook) => {
    setBooks((books) => {
      const newBooks = [];
      for (let book of books) {
        if (book.id === savedBook.id) {
          newBooks.push(savedBook);
        } else {
          newBooks.push(book);
        }
      }
      return newBooks;
    });

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
      <h2> List of Books </h2>
      <ul>
        {books.map((book) => {
          if (book.id === editingBookId) {
            return <Form initialBook={book} saveBook={updateBook} />;
          } else {
            return (
              <li key={book.id}>
                {" "}
                {book.title} {book.author_f} {book.author_l} {book.format}{" "}
                {book.owned.toString()} {book.read.toString()}
                <button
                  type="button"
                  onClick={() => {
                    onDelete(book);
                  }}
                >
                  X
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onEdit(book);
                  }}
                >
                  Edit
                </button>
              </li>
            );
          }
        })}
      </ul>
      <Form saveBook={addBook} />
    </div>
  );
}

export default Book_List;
