--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public.categories OWNER TO chrisgoodell;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: chrisgoodell
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO chrisgoodell;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrisgoodell
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying,
    description character varying,
    quantity integer NOT NULL,
    vendor_id integer,
    category_id integer
);


ALTER TABLE public.items OWNER TO chrisgoodell;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: chrisgoodell
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO chrisgoodell;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrisgoodell
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    user_id integer,
    name character varying NOT NULL,
    description character varying,
    address character varying NOT NULL,
    city character varying NOT NULL,
    state character varying(2),
    zip character varying(5),
    geocode character varying,
    starttime time without time zone NOT NULL,
    endtime time without time zone NOT NULL,
    validdays character varying(7),
    monday boolean NOT NULL,
    tuesday boolean NOT NULL,
    wednesday boolean NOT NULL,
    thursday boolean NOT NULL,
    friday boolean NOT NULL,
    saturday boolean NOT NULL,
    sunday boolean NOT NULL
);


ALTER TABLE public.locations OWNER TO chrisgoodell;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: chrisgoodell
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_id_seq OWNER TO chrisgoodell;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrisgoodell
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    password character varying,
    firstname character varying,
    lastname character varying
);


ALTER TABLE public.users OWNER TO chrisgoodell;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: chrisgoodell
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO chrisgoodell;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrisgoodell
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vendors; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.vendors (
    id integer NOT NULL,
    user_id integer,
    images text[]
);


ALTER TABLE public.vendors OWNER TO chrisgoodell;

--
-- Name: vendors_id_seq; Type: SEQUENCE; Schema: public; Owner: chrisgoodell
--

CREATE SEQUENCE public.vendors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendors_id_seq OWNER TO chrisgoodell;

--
-- Name: vendors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrisgoodell
--

ALTER SEQUENCE public.vendors_id_seq OWNED BY public.vendors.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vendors id; Type: DEFAULT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.categories (id, name) FROM stdin;
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.items (id, name, description, quantity, vendor_id, category_id) FROM stdin;
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.locations (id, user_id, name, description, address, city, state, zip, geocode, starttime, endtime, validdays, monday, tuesday, wednesday, thursday, friday, saturday, sunday) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.users (id, email, password, firstname, lastname) FROM stdin;
\.


--
-- Data for Name: vendors; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.vendors (id, user_id, images) FROM stdin;
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.items_id_seq', 1, false);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.locations_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: vendors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.vendors_id_seq', 1, false);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vendors vendors_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);


--
-- Name: items items_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: items items_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: locations locations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: vendors vendors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

