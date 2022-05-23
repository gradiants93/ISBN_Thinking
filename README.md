<p align="center">
  <h1 align="center">ISBN Thinking</h1>

  <p align="center">
    <a href="https://isbn-thinking.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/gradiants93/ISBN_Thinking/issues">Report Bug</a>
    ·
    <a href="https://github.com/gradiants93/ISBN_Thinking/issues">Request Feature</a>
  </p>
</p>

## Contents

- [About](#about)
- [Features](#features)
- [Technologies](#Technologies)
- [Installation](#Installation)

## About

ISBN Thinking is a library and book list manager. Created as a way to keep myself from getting 4 copies of the same book and keep track of titles that look interesting.

## Features

## Technologies

PostgreSQL
Express
React
Node.JS
Docker

## Installation

### Prerequisites

To run ISBN Thinking, you must have installed:

- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)

### Run ISBN Thinking on your local computer

1. Clone or fork repository inside your desired source directory:

   ```sh
   git clone https://github.com/gradiants93/ISBN_Thinking/
   ```

2. Clean the owner git by running this command in the root folder:

   ```sh
   rm -rf .git
   ```

3. Inside the root folder, install all dependecies:

   ```sh
   npm install
   ```

4. Inside the server folder, create a .env file:

   ```sh
   touch .env
   ```

5. Copy the contents from the .env.example and paste them into your newly created .env file. Change the values for user/password if necessary for your computer but do not change the name of the database. It should look similar to this:

   ```sh
   DATABASE_URL="postgresql://user:password@localhost/isbnthinking"
   DATABASE_SSL="false"
   ```

6. From the server file, restore the database dump file:

   ```sh
   psql -U postgres -f db.sql
   ```

7. Go to the client folder and run:

   ```sh
   npm start
   ```

8. Visit <http://localhost:3000> to get started making your lists!
