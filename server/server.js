const express = require("express");
const async = require("async");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("../server/db/db-connection.js");
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "build");
const app = express();
app.use(express.static(REACT_BUILD_DIR));
const convert = require("xml-js");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get("/", (req, res) => {
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

//creates an endpoint for the route /api/request
app.get("/api/request", async (req, res) => {
  try {
    let isbn = Number(req.query.isbn);
    console.log(isbn);
    let xmlresponse = await fetch(
      `http://classify.oclc.org/classify2/Classify?isbn=${isbn}&summary=true`
    );
    let parsedresponse = await xmlresponse.text();
    // console.log(parsedresponse);
    let jsonresponse = convert.xml2json(parsedresponse, {
      compact: false,
      nativeType: true,
      ignoreDeclaration: true,
      compact: true,
    });
    let data = JSON.parse(jsonresponse);
    let formatedRes = {
      author: data["classify"]["authors"]["author"]["_text"],
    };
    console.log(formatedRes);
    res.send(formatedRes);
  } catch (err) {
    console.error("Fetch error: ", err);
  }
});

//create the get request
app.get("/api/books", cors(), async (req, res) => {
  const mockBooks = [
    {
      id: 1,
      title: "Written in Red",
      author_f: "Anne",
      author_l: "Bishop",
      format: "Book",
      owned: "false",
      read: "true",
    },
    {
      id: 2,
      title: "Written in Red",
      author_f: "Anne",
      author_l: "Bishop",
      format: "Audiobook",
      owned: "false",
      read: "true",
    },
    {
      id: 3,
      title: "The Diamond Age: Or, a Young Lady's Illustrated Primer",
      author_f: "Neal",
      author_l: "Stephenson",
      format: "Book",
      owned: "true",
      read: "true",
    },
    {
      id: 4,
      title: "",
      author_f: "",
      author_l: "",
      format: "",
      owned: "",
      read: "",
    },
    {
      id: 5,
      title: "",
      author_f: "",
      author_l: "",
      format: "",
      owned: "",
      read: "",
    },
  ];
  // res.json(mockBooks);
  try {
    const { rows: books } = await db.query(
      "SELECT user_collection.id, books.title, books.author_last, books.author_first, book_formats.isbn, book_formats.format, user_collection.owned, user_collection.read from user_collection JOIN book_formats on user_collection.book_format_id = book_formats.id JOIN books on book_formats.book_id = books.id;"
    );
    res.send(books);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// new book POST
app.post("/api/newbook", cors(), async (req, res) => {
  const newBook = {
    title: req.body.title,
    author_f: req.body.author_f,
    author_l: req.body.author_l,
  };
  const newBookFormat = {
    isbn: req.body.isbn,
    format: req.body.format,
  };
  const newUserColl = {
    owned: req.body.owned,
    read: req.body.read,
  };

  async.waterfall(
    [postToBooks, postToBookFormats, postToUserColl],
    function (error, result) {
      console.log(error);
    }
  );

  // console.log([newBook, newBookFormat, newUserColl]);
  async function postToBooks() {
    const result = await db.query(
      "INSERT INTO books (title, author_first, author_last) VALUES ($1,$2,$3) RETURNING *",
      [newBook.title, newBook.author_f, newBook.author_l]
    );
    // console.log(result.rows[0]);
    // console.log(result.rows[0].id);
    // newBookFormat.id = result.rows[0].id;
    return result.rows[0].id;
  }

  async function postToBookFormats(prevResult) {
    const result = await db.query(
      "INSERT INTO book_formats (isbn, format, book_id) VALUES ($1,$2,$3) RETURNING *",
      [newBookFormat.isbn, newBookFormat.format, prevResult]
    );
    // console.log(result.rows[0]);
    // console.log(result.rows[0].id);
    return result.rows[0].id;
  }

  async function postToUserColl(prevResult) {
    const result = await db.query(
      "INSERT INTO user_collection (book_format_id, owned, read) VALUES($1, $2, $3) RETURNING *",
      [prevResult, newUserColl.owned, newUserColl.read]
    );
    // console.log(result.rows[0]);
    res.json(result.rows[0]);
  }
});

//create the POST request
app.post("/api/books", cors(), async (req, res) => {
  const newBook = {
    title: req.body.title,
    author_f: req.body.author_f,
    author_l: req.body.author_l,
  };
  const newBookFormat = {
    isbn: req.body.isbn,
    format: req.body.format,
    book_id: "",
  };
  const newUserColl = {
    book_format_id: "",
    owned: req.body.owned,
    read: req.body.read,
  };
  console.log([newBook, newBookFormat, newUserColl]);
  const result = await db.query(
    "INSERT INTO user_collection(book_format_id, owned, read) VALUES($1, $2, $3) RETURNING *",
    [newBook.book_format_id, newBook.owned, newBook.read]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// // delete request
// app.delete("/api/students/:studentId", cors(), async (req, res) => {
//   const studentId = req.params.studentId;
//   //console.log(req.params);
//   await db.query("DELETE FROM students WHERE id=$1", [studentId]);
//   res.status(200).end();
// });

// Put request - Update request
app.put("/api/books/:bookId", cors(), async (req, res) => {
  const bookId = req.params.bookId;
  const updateBook = {
    book_format_id: req.body.book_format_id,
    owned: req.body.owned,
    read: req.body.read,
  };
  //console.log(req.params);
  // UPDATE students SET lastname = 'TestMarch' WHERE id = 1;
  console.log(bookId);
  console.log(updateBook);
  const query = `UPDATE user_collection SET owned=$1, read=$2 WHERE id = ${bookId} RETURNING *`;
  console.log(query);
  const values = [updateBook.owned, updateBook.read];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
