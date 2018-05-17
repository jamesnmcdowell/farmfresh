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
-- Name: farmfreshgraph; Type: SCHEMA; Schema: -; Owner: james
--

CREATE SCHEMA farmfreshgraph;


ALTER SCHEMA farmfreshgraph OWNER TO james;

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
-- Name: categories; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying,
    image_url character varying
);


ALTER TABLE public.categories OWNER TO james;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: james
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO james;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: james
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: james
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


ALTER TABLE public.items OWNER TO james;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: james
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO james;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: james
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    address character varying NOT NULL,
    city character varying NOT NULL,
    state character varying(2),
    zip character varying(5),
    valid_days character varying(7),
    vendor_id integer,
    monday character varying,
    tuesday character varying,
    wednesday character varying,
    thursday character varying,
    friday character varying,
    saturday character varying,
    sunday character varying,
    start_time character varying,
    end_time character varying,
    lat character varying,
    lng character varying
);


ALTER TABLE public.locations OWNER TO james;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: james
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_id_seq OWNER TO james;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: james
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: subcategories; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.subcategories (
    id integer NOT NULL,
    name character varying,
    image_url character varying
);


ALTER TABLE public.subcategories OWNER TO james;

--
-- Name: subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: james
--

CREATE SEQUENCE public.subcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subcategories_id_seq OWNER TO james;

--
-- Name: subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: james
--

ALTER SEQUENCE public.subcategories_id_seq OWNED BY public.subcategories.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: james
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    user_name character varying
);


ALTER TABLE public.users OWNER TO james;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: james
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO james;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: james
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vendors; Type: TABLE; Schema: public; Owner: james
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
    zip character varying(5),
    image_url character varying
);


ALTER TABLE public.vendors OWNER TO james;

--
-- Name: vendors_id_seq; Type: SEQUENCE; Schema: public; Owner: james
--

CREATE SEQUENCE public.vendors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendors_id_seq OWNER TO james;

--
-- Name: vendors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: james
--

ALTER SEQUENCE public.vendors_id_seq OWNED BY public.vendors.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: subcategories id; Type: DEFAULT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.subcategories ALTER COLUMN id SET DEFAULT nextval('public.subcategories_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vendors id; Type: DEFAULT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: james
--

COPY public.categories (id, name, image_url) FROM stdin;
3	Meat and Seafood	https://image.flaticon.com/icons/svg/135/135628.svg
1	Dairy and Eggs	https://image.flaticon.com/icons/svg/135/135626.svg
4	Personal Care	https://image.flaticon.com/icons/svg/863/863056.svg
2	Fruits and Vegetables	https://image.flaticon.com/icons/svg/866/866722.svg
5	Canned and Packaged	https://image.flaticon.com/icons/svg/836/836566.svg
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: james
--

COPY public.items (id, name, description, quantity, vendor_id, category_id, unit_of_measure, image_url, price, is_available) FROM stdin;
2	Farm Fresh Eggs	Grade A Large eggs. Hens are free to forage and raised on grass.	10	33	1	dozen	http://www.hephzibahfarms.com/wp-content/uploads/2015/12/IMG_04042.jpg	$6.99	t
1	Clover Honey	Strong clover nectar aroma with light amber coloring. Delicate flavor with hints of freshly cut grass and hay.	5	33	5	each	https://coxshoney.com/wp-content/uploads/2012/04/Honey-and-Clover.jpg	$4.99	t
5	Bacon	Hickory-smoked, thick-sliced bacon.	10	33	3	pound	https://2.bp.blogspot.com/-YmJKLNFUjGc/UTDwfkNM0NI/AAAAAAAAeZw/TvJGb0LDtLQ/s640/P1170947a.jpg	$2.99	t
8	Jalopenos	super fresh, super spicy	10	33	2	pound	https://2.bp.blogspot.com/-YmJKLNFUjGc/UTDwfkNM0NI/AAAAAAAAeZw/TvJGb0LDtLQ/s640/P1170947a.jpg	$1.99	t
13	Turkey bacon	thick sliced and uncured	10	33	3	pounds	\N	$6.00	\N
16	cabbage	simple but delicious	10	33	2	pounds	\N	$3.00	\N
12	bananas	organic and fresh	10	33	2	pounds	\N	$1.00	\N
10	Apples	Fresh granny smith	10	33	2	pounds	\N	$2.00	\N
14	bacon	maple cut	10	33	3	pounds	\N	$8.00	\N
7	Carrots	farm fresh carrots plucked from the earth	5	34	2	pound	https://2.bp.blogspot.com/-YmJKLNFUjGc/UTDwfkNM0NI/AAAAAAAAeZw/TvJGb0LDtLQ/s640/P1170947a.jpg	$1.99	t
15	beans	good and green	10	34	2	pounds	\N	$2.00	\N
3	Milk	Raw unpasteurized milk from grass-fed cows.	10	1	1	gallon	http://www.theorganicdietitian.com/wp-content/uploads/2013/09/organic-milk-bottle-590.jpg	$4.99	t
11	oranges	georgia grown	10	1	2	pounds	\N	$2.00	\N
4	Watermelon	Organic and seedless.	10	35	2	pound	http://producegeek.com/wp-content/uploads/2017/01/organic-watermelon-02-940x626@2x.jpg	$3.99	t
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: james
--

COPY public.locations (id, name, description, address, city, state, zip, valid_days, vendor_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_time, end_time, lat, lng) FROM stdin;
1	Cow Tippers	Roadside stand, all items available unless otherwise noted	1616 Piedmont Ave NE	Atlanta	GA	30324	0000011	33	\N	\N	\N	\N	\N	\N	\N	8:00	11:00	34	-84
2	Corner Street Market	Enjoy good stuff at a market	3424 Piedmont Rd NE	Atlanta	GA	30305	0000011	33	\N	\N	\N	\N	\N	\N	\N	4:00	6:00	33	-84
4	Parking Lot behind Lowes	Come catch the freshest produce every saturday morning	4930 Rabbit Lane	Atlanta	GA	30495	\N	34								9:00	12:00	20	-70
5	Fresh Market	only the freshest ingredients	3857 Waverly Way	atlanta	GA	30047	\N	1								9:00	3:00	10	80
3	Smith Grocery	Family owned since 1905	7495 Cottontail Way	Loganville	GA	40393	\N	35								10:00	1:00	31	-83
\.


--
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: james
--

COPY public.subcategories (id, name, image_url) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: james
--

COPY public.users (id, email, password, first_name, last_name, user_name) FROM stdin;
39	james	$2b$10$bHNdOac2mo7dUXuYpJOS9OY3vkCBU.uo.a2qvHew7LZ7R0L8znU1a	james	james	james
50	john@gmail.com	$2b$10$Uu2Osp7LSq68RIDczaaFOuiRHYZ9kjS4TFzV.33Kxu8ev7XoomW0S	john	dowell	Johhny
51	rebecca@gmail.com	$2b$10$s9VY.5.aDK.DBRPI6FUM7eRS9CH7614zbxMRj4Y4dwxO9y5GnvREa	rebecca	rebecca	rebecca
52	chris@gmail.com	$2b$10$m9U0idACgkwdG63lKEUZ7OhNo/4G2aNlnsklXYzkAebd2drroLQty	chris	chris	chris
\.


--
-- Data for Name: vendors; Type: TABLE DATA; Schema: public; Owner: james
--

COPY public.vendors (id, user_id, images, name, about_description, product_description, address, city, state, zip, image_url) FROM stdin;
1	50	\N	White Oak Pastures	White Oak Pastures is a 150 year old multigenerational family farm that cooperates with nature to produce artisan products. We work hard to ensure that all of our production practices are Fair, Sustainable, and Humane. 	We never fail to conduct our business in an honorable manner, for the sake of our animals, our land, and our people who produce and consume our goods.	274 WIllow Road	Stone Mountain	GA	30054	http://www.landandrivers.com/sites/default/files/georgia_farms_for_sale.jpg
33	39	\N	James' Farm	The story starts in 1905 when our family purchased what would become James' Farms. For years, it was a diversified farm - as they all were in that era. A few crops and a few animals worked in symbiosis. Organic was the only option at the time, as GMO's were unheard of, and the USDA wasn't demanding that farmers plant corn, soybeans & wheat from fence-line to fence-line.	At this farm, we humanely and organically use domestic animals to produce the nutritious food we provide for our growing population. We do not endorse subjecting our animals to highly confined unnatural conditions in order to increase production. We would rather allow our animals to roam our pastures and exhibit their natural, instinctual behavior. In other words, we want our cows to be able to graze clean, organically managed pastures and lay in the shade to chew their cud; our pigs to root in the dirt and wallow in the mud; and our chickens to be provided protection from weather and predators while still being able to range our pastures, eating forage and bugs. This environment that we provide for them not only makes for happy animals (which, I’m sure it does), but it creates a stress-free lifestyle and allows for a natural, balanced diet for each individual animal.	270 Willowwind Dr	Loganville	GA	30052	https://c1.staticflickr.com/4/3268/5708457983_0dc5484ce3_b.jpg
35	52	\N	Scott Family Farm	Scott Family Farm is a family owned sustainable plantation. We proudly donate a portion of our proceeds from every sale to schools, churches and other community programs.  Our educational working farm is located in the historical heart of the Green’s Cut Community in Burke County, just off Old Waynesboro Road. Bring the family out for a bit of history, fresh gourmet honey and enjoy geocaching on our walking trails!	We offer wedding, corporate, and family event greenspace under 150 year-old oaks. We sell and ship honey, goats milk soap, natural body scrubs, long leaf pine needle baskets, lip balms and Murray Cypress Christmas Trees. Most items are available with custom labels including your business card, corporate logo, or customized wedding icon. All products are available as event gifts and exquisitely packaged for holiday gift giving. Scott Family Farm is open by appointment.	28495 Oak Groove	Gainsville	GA	4653	https://www.google.com/search?q=georgia+farm&num=40&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjDpILyz43bAhXmp1kKHVYBCekQ_AUICygC&biw=1210&bih=774#imgrc=YhK3itAPLR8piM:
34	51	\N	Lathem Farm	David Lathem, owner of Lathem Family Farms, is no stranger to raising poultry. As a second generation poultry farmer he grew up carrying feed bags to feed the chickens.  His first job after graduating from the University of Georgia was visiting chicken farmers  as an extension specialist.  Therefore, it is natural he now owns and operates Lathem Family Farms, a flourishing poultry farm nestled in the beautiful pine trees of Pendergrass, GA.	Lathem Family Farms remains a family-run business, with Mr. Lathem’s nephew, Evan, working to preserve the Lathem legacy. The farm raises Hi-Line Brown, Bovan Brown, and ISA Brown laying hens. David took a lot of care choosing how to house his birds. It was important for raising his chicks, to make sure they have an enriching and stimulating environment. Once the hens are mature, they are moved into an aviary, which provides them with many different levels to explore and lots of perching. To ensure that the birds are breathing clean air, David enlisted the expertise of a ventilation specialist from the University of Georgia. The birds freely roam the aviary as well as having free access to an outdoor area.  David states “The hens are happy and doing well!”	4839 Winding Creek Rd.	Helen	GA	30475	http://cdn.onlyinyourstate.com/wp-content/uploads/2015/07/3814523528_94d10260bd_b.jpg
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: james
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: james
--

SELECT pg_catalog.setval('public.items_id_seq', 16, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: james
--

SELECT pg_catalog.setval('public.locations_id_seq', 5, true);


--
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: james
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: james
--

SELECT pg_catalog.setval('public.users_id_seq', 52, true);


--
-- Name: vendors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: james
--

SELECT pg_catalog.setval('public.vendors_id_seq', 33, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: subcategories subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vendors vendors_pkey; Type: CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);


--
-- Name: items items_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: items items_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: locations locations_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: vendors vendors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: james
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

