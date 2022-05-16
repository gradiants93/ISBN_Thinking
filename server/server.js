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

// classify query book isbn /api/request
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
    let data = JSON.parse(jsonresponse)["classify"];
    let formatedRes;
    // console.log(data);
    if (data.response._attributes.code == 4) {
      console.log(
        "code: " + data.response._attributes.code + " multiwork response"
      );
      formatedRes = [];
      data.works.work.map((item) => {
        formatedRes.push({
          author: item["_attributes"]["author"],
          format: item["_attributes"]["format"],
          title: item["_attributes"]["title"],
        });
      });
    }
    if (data.response._attributes.code == 0) {
      console.log(
        "code: " + data.response._attributes.code + " single work response"
      );
      formatedRes = {
        author: data["work"]["_attributes"]["author"],
        format: data["work"]["_attributes"]["format"],
        title: data["work"]["_attributes"]["title"],
      };
    }
    console.log(formatedRes);
    res.send(formatedRes);
  } catch (err) {
    console.error("Fetch error: ", err);
  }
});

// Show all user book records with book info /api/books
app.get("/api/books", cors(), async (req, res) => {
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

// manually add new book POST /api/newbook
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

  async function postToBooks() {
    const result = await db.query(
      "INSERT INTO books (title, author_first, author_last) VALUES ($1,$2,$3) RETURNING *",
      [newBook.title, newBook.author_f, newBook.author_l]
    );
    return result.rows[0].id;
  }

  async function postToBookFormats(prevResult) {
    const result = await db.query(
      "INSERT INTO book_formats (isbn, format, book_id) VALUES ($1,$2,$3) RETURNING *",
      [newBookFormat.isbn, newBookFormat.format, prevResult]
    );
    return result.rows[0].id;
  }

  async function postToUserColl(prevResult) {
    const result = await db.query(
      "INSERT INTO user_collection (book_format_id, owned, read) VALUES($1, $2, $3) RETURNING *",
      [prevResult, newUserColl.owned, newUserColl.read]
    );
    res.json(result.rows[0]);
  }
});

// delete request
app.delete("/api/books/:bookId", cors(), async (req, res) => {
  const usercollId = req.params.studentId;
  //console.log(req.params);
  await db.query("DELETE FROM students WHERE id=$1", [studentId]);
  res.status(200).end();
});

// Update user coll record PUT /api/books/:bookId
app.put("/api/books/:bookId", cors(), async (req, res) => {
  const bookId = req.params.bookId;
  const updateBook = {
    book_format_id: req.body.book_format_id,
    owned: req.body.owned,
    read: req.body.read,
  };
  const query = `UPDATE user_collection SET owned=$1, read=$2 WHERE id = ${bookId} RETURNING *`;
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

// Query DB for specific book GET /api/findbook/:title/:isbn/:format/:author_f/:author_l
app.get(
  "/api/findbook/:title/:isbn/:format/:author_f/:author_l",
  cors(),
  async (req, res) => {
    const apiBook = {
      title: req.params.title,
      author_f: req.params.author_f,
      author_l: req.params.author_l,
    };
    const apiBookFormat = {
      isbn: req.params.isbn,
      format: req.params.format,
    };
    const UserColl = {
      owned: req.params.owned,
      read: req.params.read,
    };

    async.waterfall(
      [queryBooks, queryBookFormats, queryUserColl],
      function (error, result) {
        console.log(error);
      }
    );

    async function queryBooks() {
      console.log("query books for", apiBook);
      const result = await db.query(
        "SELECT * FROM books WHERE lower(title)=$1 AND lower(author_first)=$2 AND lower(author_last)=$3",
        [
          apiBook.title.toLowerCase(),
          apiBook.author_f.toLowerCase(),
          apiBook.author_l.toLowerCase(),
        ]
      );
      console.log(result.rows[0]);
      if (result.rows[0] === undefined) {
        console.log("No record of book");
        return false;
      }
      return result.rows[0].id;
    }

    async function queryBookFormats(prevResult) {
      console.log("query book formats");
      apiBook.book_id = prevResult;
      if (prevResult == false) {
        return false;
      }
      const result = await db.query(
        "SELECT * FROM book_formats WHERE book_id=$1 AND lower(format)=$2 AND isbn=$3",
        [prevResult, apiBookFormat.format.toLowerCase(), apiBookFormat.isbn]
      );
      console.log(result.rows[0]);
      if (result.rows[0] === undefined) {
        console.log("No record of format");
        return false;
      }
      return result.rows[0].id;
    }

    async function queryUserColl(prevResult) {
      console.log("query user coll");
      apiBook.book_format_id = prevResult;
      if (prevResult == false) {
        return false;
      }
      const result = await db.query(
        "SELECT user_collection.id, books.title, books.author_last, books.author_first, book_formats.isbn, book_formats.format, user_collection.owned, user_collection.read from user_collection JOIN book_formats on user_collection.book_format_id = book_formats.id JOIN books on book_formats.book_id = books.id WHERE book_format_id=$1",
        [prevResult]
      );
      console.log(result.rows[0]);
      if (result.rows[0] === undefined) {
        apiBook.user_coll_id = false;
        return res.json(apiBook);
      }
      return res.json(result.rows[0]);
    }
  }
);

// create user collection record for specific format in DB GET /api/createusercoll/:title/:isbn/:format/:author_f/:author_l/:owned/:read
app.get(
  "/api/createusercoll/:title/:isbn/:format/:author_f/:author_l/:owned/:read",
  cors(),
  async (req, res) => {
    const apiBook = {
      title: req.params.title,
      author_f: req.params.author_f,
      author_l: req.params.author_l,
    };
    const apiBookFormat = {
      isbn: req.params.isbn,
      format: req.params.format,
    };
    const UserColl = {
      owned: req.params.owned,
      read: req.params.read,
    };

    async.waterfall(
      [queryBooks, queryBookFormats, queryUserColl],
      function (error, result) {
        console.log(error);
      }
    );

    async function queryBooks() {
      console.log("query books");
      const result = await db.query(
        "SELECT * FROM books WHERE lower(title)=$1 AND lower(author_first)=$2 AND lower(author_last)=$3",
        [
          apiBook.title.toLowerCase(),
          apiBook.author_f.toLowerCase(),
          apiBook.author_l.toLowerCase(),
        ]
      );
      console.log(result.rows[0]);
      if (result.rows[0] === undefined) {
        console.log("Insert to books");
        const resultPOST = await db.query(
          "INSERT INTO books (title, author_first, author_last) VALUES ($1,$2,$3) RETURNING *",
          [apiBook.title, apiBook.author_f, apiBook.author_l]
        );
        return resultPOST.rows[0].id;
      }
      return result.rows[0].id;
    }

    async function queryBookFormats(prevResult) {
      console.log("query book formats");
      const result = await db.query(
        "SELECT * FROM book_formats WHERE book_id=$1 AND lower(format)=$2 AND isbn=$3",
        [prevResult, apiBookFormat.format.toLowerCase(), apiBookFormat.isbn]
      );
      console.log(result.rows[0]);
      if (result.rows[0] === undefined) {
        console.log("insert to book formats");
        const resultPOST = await db.query(
          "INSERT INTO book_formats (isbn, format, book_id) VALUES ($1,$2,$3) RETURNING *",
          [apiBookFormat.isbn, apiBookFormat.format, prevResult]
        );
        return resultPOST.rows[0].id;
      }
      return result.rows[0].id;
    }

    async function queryUserColl(prevResult) {
      console.log("query user coll");
      const result = await db.query(
        "SELECT * FROM user_collection WHERE book_format_id=$1",
        [prevResult]
      );
      console.log(result.rows[0]);
      if (result.rows[0] === undefined) {
        const resultPOST = await db.query(
          "INSERT INTO user_collection (owned, read, book_format_id) VALUES ($1, $2, $3) RETURNING *",
          [UserColl.owned, UserColl.read, prevResult]
        );
        return res.json(resultPOST.rows[0]);
      }
      return res.json(result.rows[0]);
    }
  }
);

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
