-- add in a new title/author combo
-- INSERT INTO books (title, author_first, author_last) VALUES ('The Diamond Age: Or, a Young Lady''s Illustrated Primer', 'Neal', 'Stephenson');

-- add in hardcover
-- INSERT INTO book_formats (isbn, format, book_id) VALUES ('9780451464965', 'Book', 1);
-- INSERT INTO user_collection (book_format_id, owned, read) VALUES (1, FALSE, TRUE);
-- -- add in audiobook
-- INSERT INTO book_formats (isbn, format, book_id) VALUES ('9781101604717', 'Audiobook', 1);
-- INSERT INTO user_collection (book_format_id, owned, read) VALUES (2, FALSE, TRUE);
-- -- add in diamondage
-- INSERT INTO book_formats (isbn, format, book_id) VALUES ('9780553096095', 'Book', 2);
-- INSERT INTO user_collection (book_format_id, owned, read) VALUES (3, TRUE, TRUE);

SELECT * from books;
-- SELECT * from book_formats;
-- SELECT user_collection.id, books.title, books.author_last, books.author_first, book_formats.isbn, book_formats.format, user_collection.owned, user_collection.read from user_collection JOIN book_formats on user_collection.book_format_id = book_formats.id JOIN books on book_formats.book_id = books.id;

-- ALTER SEQUENCE user_collection_id_seq RESTART WITH 1;
select pg_get_serial_sequence('books','id');

-- select currval( pg_get_serial_sequence('books','id'))
select (last_value) from books_id_seq;