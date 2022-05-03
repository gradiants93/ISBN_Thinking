--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: book_formats; Type: TABLE; Schema: public; Owner: eileen
--

CREATE TABLE public.book_formats (
    id integer NOT NULL,
    isbn character varying(13),
    format character varying(9),
    book_id integer,
    creation_date date DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.book_formats OWNER TO eileen;

--
-- Name: book_formats_id_seq; Type: SEQUENCE; Schema: public; Owner: eileen
--

CREATE SEQUENCE public.book_formats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_formats_id_seq OWNER TO eileen;

--
-- Name: book_formats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eileen
--

ALTER SEQUENCE public.book_formats_id_seq OWNED BY public.book_formats.id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: eileen
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(250),
    author_last character varying(250),
    author_first character varying(250),
    creation_date date DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.books OWNER TO eileen;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: eileen
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO eileen;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eileen
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: user_collection; Type: TABLE; Schema: public; Owner: eileen
--

CREATE TABLE public.user_collection (
    id integer NOT NULL,
    book_format_id integer,
    owned boolean,
    read boolean,
    creation_date date DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_collection OWNER TO eileen;

--
-- Name: user_collection_id_seq; Type: SEQUENCE; Schema: public; Owner: eileen
--

CREATE SEQUENCE public.user_collection_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_collection_id_seq OWNER TO eileen;

--
-- Name: user_collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eileen
--

ALTER SEQUENCE public.user_collection_id_seq OWNED BY public.user_collection.id;


--
-- Name: book_formats id; Type: DEFAULT; Schema: public; Owner: eileen
--

ALTER TABLE ONLY public.book_formats ALTER COLUMN id SET DEFAULT nextval('public.book_formats_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: eileen
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: user_collection id; Type: DEFAULT; Schema: public; Owner: eileen
--

ALTER TABLE ONLY public.user_collection ALTER COLUMN id SET DEFAULT nextval('public.user_collection_id_seq'::regclass);


--
-- Data for Name: book_formats; Type: TABLE DATA; Schema: public; Owner: eileen
--

COPY public.book_formats (id, isbn, format, book_id, creation_date) FROM stdin;
1	9780451464965	Book	1	2022-04-26
2	9781101604717	Audiobook	1	2022-04-26
3	9780553096095	Book	2	2022-04-26
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: eileen
--

COPY public.books (id, title, author_last, author_first, creation_date) FROM stdin;
1	Written in Red	Bishop	Anne	2022-04-26
2	The Diamond Age: Or, a Young Lady's Illustrated Primer	Stephenson	Neal	2022-04-26
\.


--
-- Data for Name: user_collection; Type: TABLE DATA; Schema: public; Owner: eileen
--

COPY public.user_collection (id, book_format_id, owned, read, creation_date) FROM stdin;
2	2	f	t	2022-04-26
1	1	f	t	2022-04-26
3	3	t	t	2022-04-26
4	\N	t	f	2022-05-02
\.


--
-- Name: book_formats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eileen
--

SELECT pg_catalog.setval('public.book_formats_id_seq', 3, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eileen
--

SELECT pg_catalog.setval('public.books_id_seq', 1, false);


--
-- Name: user_collection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eileen
--

SELECT pg_catalog.setval('public.user_collection_id_seq', 4, true);


--
-- Name: book_formats book_formats_pkey; Type: CONSTRAINT; Schema: public; Owner: eileen
--

ALTER TABLE ONLY public.book_formats
    ADD CONSTRAINT book_formats_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: eileen
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: user_collection user_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: eileen
--

ALTER TABLE ONLY public.user_collection
    ADD CONSTRAINT user_collection_pkey PRIMARY KEY (id);


--
-- Name: book_formats book_formats_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eileen
--

ALTER TABLE ONLY public.book_formats
    ADD CONSTRAINT book_formats_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: user_collection user_collection_book_format_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eileen
--

ALTER TABLE ONLY public.user_collection
    ADD CONSTRAINT user_collection_book_format_id_fkey FOREIGN KEY (book_format_id) REFERENCES public.book_formats(id);


--
-- PostgreSQL database dump complete
--

