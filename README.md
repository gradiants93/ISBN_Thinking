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
- [Technologies](#technologies)
- [Installation](#installation)

## About

ISBN Thinking is a library and book list manager. Created as a way to keep myself from getting 4 copies of the same book and keep track of titles that look interesting.

## Features

## Technologies

<table align="center">
   <tr>
      <td align="center" width="96">
         <img src="https://user-images.githubusercontent.com/74997368/168976819-15a1f4e0-29cf-4ac0-94a7-1f15eee374a1.png" width="48" height="48" alt="postgreSQL" /> PostgreSQL
         <br />
      </td>
      <td align="center" width="96">
         <img src="https://user-images.githubusercontent.com/74997368/168978951-5ac2af5e-c911-4e59-b493-683071cf1860.png" width="48" height="48" alt="Express" /> Express
         <br />
      </td>
      <td align="center" width="96">
         <img src="https://user-images.githubusercontent.com/74997368/168979311-4a486cad-32c8-46f4-a5da-912fdc51b2d6.png" width="48" height="48" alt="React" /> React 
         <br />
      </td>
      <td align="center" width="96">
         <img src="https://user-images.githubusercontent.com/74997368/168979848-733f7090-0f78-401a-9ceb-4267231abef7.png" width="48" height="48" alt="Node" /> Node.js 
         <br />
      </td>
   </tr>
   <tr>
      <td align="center" width="96">
         <img src="https://user-images.githubusercontent.com/74997368/168980702-6b8c5030-26c7-4c4f-b4ac-727d26daafd3.png" width="48" height="48" alt="Docker" /> Docker 
         <br /> 
      </td>
      <td align="center" width="96">
         <img src="https://user-images.githubusercontent.com/74997368/168981541-6d1713a5-25ce-4d4b-9d20-0eef28957af0.png" width="48" height="48" alt="Heroku" /> Heroku 
         <br />
      </td>
      <td align="center" width="96">
         <img src="https://www.oclc.org/content/dam/oclc/common/images/logos/new/OCLC/OCLC_Logo_V_Color_NoTag.png" width="48" height="48" alt="Classify API" /> Classify API 
         <br /> 
      </td>
      <td align="center" width="96">
         <img src="https://www.libraryjournal.com/binaries/content/gallery/190502_openlibrary.jpg" width="48" height="48" alt="Open Library" /> Open Library 
         <br /> 
      </td>
   </tr>
</table>

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

8. Visit <https://localhost:3000> to get started making your lists!

## Future Features
