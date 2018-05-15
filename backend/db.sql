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
-- Name: farmfreshgraph; Type: SCHEMA; Schema: -; Owner: chrisgoodell
--

CREATE SCHEMA farmfreshgraph;


ALTER SCHEMA farmfreshgraph OWNER TO chrisgoodell;

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
    name character varying,
    image_url character varying
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
    category_id integer,
    unit_of_measure character varying,
    image_url character varying,
    price money,
    is_available boolean
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
    name character varying NOT NULL,
    description character varying,
    address character varying NOT NULL,
    city character varying NOT NULL,
    state character varying(2),
    zip character varying(5),
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    valid_days character varying(7),
    monday boolean NOT NULL,
    tuesday boolean NOT NULL,
    wednesday boolean NOT NULL,
    thursday boolean NOT NULL,
    friday boolean NOT NULL,
    saturday boolean NOT NULL,
    sunday boolean NOT NULL,
    vendor_id integer,
    lat numeric,
    lng numeric
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
-- Name: subcategories; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.subcategories (
    id integer NOT NULL,
    name character varying,
    image_url character varying
);


ALTER TABLE public.subcategories OWNER TO chrisgoodell;

--
-- Name: subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: chrisgoodell
--

CREATE SEQUENCE public.subcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subcategories_id_seq OWNER TO chrisgoodell;

--
-- Name: subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: chrisgoodell
--

ALTER SEQUENCE public.subcategories_id_seq OWNED BY public.subcategories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: chrisgoodell
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    is_vendor boolean
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
    images text[],
    name character varying,
    about_description character varying,
    product_description character varying,
    address character varying,
    city character varying,
    state character varying(2),
    zip character varying(5)
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
-- Name: subcategories id; Type: DEFAULT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.subcategories ALTER COLUMN id SET DEFAULT nextval('public.subcategories_id_seq'::regclass);


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

COPY public.categories (id, name, image_url) FROM stdin;
1	Dairy	\N
2	Eggs	\N
3	Vegetables	\N
4	Meat	\N
5	Fruits	\N
6	Seafood	\N
7	Pantry	\N
8	Personal Care	\N
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.items (id, name, description, quantity, vendor_id, category_id, unit_of_measure, image_url, price, is_available) FROM stdin;
4	Watermelon	Organic and seedless.	10	1	5	pound	http://producegeek.com/wp-content/uploads/2017/01/organic-watermelon-02-940x626@2x.jpg	$3.99	t
5	Bacon	Hickory-smoked, thick-sliced bacon.	10	1	4	pound	https://2.bp.blogspot.com/-YmJKLNFUjGc/UTDwfkNM0NI/AAAAAAAAeZw/TvJGb0LDtLQ/s640/P1170947a.jpg	$2.99	t
3	Milk	Raw unpasteurized milk from grass-fed cows.	10	1	1	gallon	http://www.theorganicdietitian.com/wp-content/uploads/2013/09/organic-milk-bottle-590.jpg	$4.99	t
2	Farm Fresh Eggs	Grade A Large eggs. Hens are free to forage and raised on grass.	10	1	2	dozen	http://www.hephzibahfarms.com/wp-content/uploads/2015/12/IMG_04042.jpg	$6.99	t
1	Clover Honey	Strong clover nectar aroma with light amber coloring. Delicate flavor with hints of freshly cut grass and hay.	5	1	7	each	https://coxshoney.com/wp-content/uploads/2012/04/Honey-and-Clover.jpg	$4.99	t
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.locations (id, name, description, address, city, state, zip, start_time, end_time, valid_days, monday, tuesday, wednesday, thursday, friday, saturday, sunday, vendor_id, lat, lng) FROM stdin;
1	Cow Tippers	Roadside stand, all items available unless otherwise noted	1616 Piedmont Ave NE	Atlanta	GA	30324	09:00:00	15:00:00	0000011	f	f	f	f	f	t	t	\N	\N	\N
\.


--
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.subcategories (id, name, image_url) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.users (id, email, password, first_name, last_name, is_vendor) FROM stdin;
1	james@james.com	ABC	James	McDowell	\N
2	chris@chris.com	ABC	Chris	Goodell	\N
\.


--
-- Data for Name: vendors; Type: TABLE DATA; Schema: public; Owner: chrisgoodell
--

COPY public.vendors (id, user_id, images, name, about_description, product_description, address, city, state, zip) FROM stdin;
1	1	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.items_id_seq', 5, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.locations_id_seq', 1, true);


--
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: vendors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: chrisgoodell
--

SELECT pg_catalog.setval('public.vendors_id_seq', 1, true);


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
-- Name: subcategories subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (id);


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
-- Name: locations locations_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: vendors vendors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: chrisgoodell
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

