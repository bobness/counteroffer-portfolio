--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 14.4

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
-- Name: experiences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experiences (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title text NOT NULL,
    company text NOT NULL,
    startdate date NOT NULL,
    enddate date,
    summary text
);


ALTER TABLE public.experiences OWNER TO postgres;

--
-- Name: experiences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experiences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.experiences_id_seq OWNER TO postgres;

--
-- Name: experiences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.experiences_id_seq OWNED BY public.experiences.id;


--
-- Name: facts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    job_id integer
);


ALTER TABLE public.facts OWNER TO postgres;

--
-- Name: facts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facts_id_seq OWNER TO postgres;

--
-- Name: facts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facts_id_seq OWNED BY public.facts.id;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    email text NOT NULL,
    company text,
    archived boolean DEFAULT false NOT NULL
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    value text,
    question_id integer NOT NULL,
    sender text,
    job_id integer,
    datetime timestamp without time zone
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    question character varying(255),
    type character varying(20),
    required boolean DEFAULT true NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    experience_id integer NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: themes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.themes (
    id integer NOT NULL,
    user_id integer,
    name text,
    tags text[]
);


ALTER TABLE public.themes OWNER TO postgres;

--
-- Name: themes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.themes_id_seq OWNER TO postgres;

--
-- Name: themes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.themes_id_seq OWNED BY public.themes.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    email character varying NOT NULL,
    hashed_password character varying NOT NULL,
    current_session character varying,
    name character varying(255),
    username character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: experiences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiences ALTER COLUMN id SET DEFAULT nextval('public.experiences_id_seq'::regclass);


--
-- Name: facts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facts ALTER COLUMN id SET DEFAULT nextval('public.facts_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: themes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes ALTER COLUMN id SET DEFAULT nextval('public.themes_id_seq'::regclass);


--
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experiences (id, user_id, title, company, startdate, enddate, summary) FROM stdin;
1	1	Founder	Datagotchi Labs	2018-01-01	\N	R&D on data-driven UIs to solve wicked social problems, including the job market and news reliability
2	1	Staff R&D Engineer	Tanium	2020-06-01	2022-06-01	Researched ways to improve user experiences across the platform
3	1	Senior Software Engineer	Tanium	2016-08-01	2018-06-01	Team lead for the platform's main UI at a late-stage startup providing a network management platform
5	1	Senior UX Engineer	Driven Inc.	2015-07-01	2016-03-01	Lead of the frontend development team in an early-stage startup providing an application performance management (APM) tool
4	1	Product Manager	Driven Inc.	2016-03-01	2016-08-01	Internal, or UX-driven, product lead/manager working with the frontend development team
6	1	Co-Founder & UX Consultant	Social Ergonomics Consulting	2014-11-01	2015-07-01	Consulted on user research, how it informs product strategy and UX design, and startup best practices
7	1	Senior UX Engineer	Collusion	2013-12-01	2014-11-01	Product lead and developer of an early-stage startup providing a platform for team collaboration
8	1	Data Analytics Engineer	Exaptive	2013-03-01	2013-10-01	Data analytics and visualizations developer & data scientist at an early-stage startup providing a data science/bioinformatics platform
9	1	Research Scientist	Charles River Analytics	2010-10-01	2013-03-01	Researcher, product lead, UX designer, and engineer in a small government R&D firm
10	1	Data Scientist & UX Engineer	BBN Technologies	2008-08-01	2010-10-01	Data scientist, full-stack engineer, UX designer, and internal UX consultant in a med-sized government R&D firm (acquired by Raytheon)
11	1	Data Scientist (Graduate Intern)	ScanScout	2008-05-01	2008-08-01	Data science intern in small/med startup in the video advertising space (acquired by Tremor Video)
12	1	Graduate Research Assistant	Penn State University (College of Information Sciences and Technology)	2007-09-01	2008-05-01	Researched decision recommendation, decision tree induction, and visualizations
13	1	Software Engineer (Intern)	IBM	2007-05-01	2007-08-01	Developed renderer for Eclipse's Standard Widget Toolkit fo ran XML GUI markup language
14	1	Software Engineer (Intern)	IBM	2005-01-01	2005-08-01	Led team that designed and implemented XML-based debugging tool for developers 
15	1	IT Administrator & Web/Database Developer	Great Lakes Label, LLC	2002-01-01	2004-01-01	Designed and developed e-commerce website that hooked into an enterprise resource planning (ERP) system
16	1	Data Science Teaching Assistant	General Assembly	2016-05-01	2016-07-31	Tutored students on descriptive and inferential statistics, and machine learning models
\.


--
-- Data for Name: facts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facts (id, user_id, key, value, job_id) FROM stdin;
2	1	Objective	To help others with software engineering, UX, or machine learning while working on my company -- or a full-time job if it's the right fit	\N
1	1	Job Search Stage	Passively open to new opportunities	\N
3	1	Location	I live in Petaluma, CA currently, so REMOTE would be best	\N
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs (id, user_id, email, company, archived) FROM stdin;
15	1	bob@datagotchi.net	\N	f
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, value, question_id, sender, job_id, datetime) FROM stdin;
25	Javascript,Typescript	1	bob@datagotchi.net	13	\N
26		2	bob@datagotchi.net	13	\N
27		3	bob@datagotchi.net	13	\N
28	Product Strategy	1	bob@datagotchi.net	15	\N
29	asdf	2	bob@datagotchi.net	15	\N
30	asdf	3	bob@datagotchi.net	15	\N
31	asdf	4	bob@datagotchi.net	15	\N
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, user_id, question, type, required) FROM stdin;
1	1	Which of my skills are most useful for the opportunity?	skills	t
3	1	Other details about the opportunity	textarea	f
2	1	What other skills are required/desired for the opportunity?	textarea	t
4	1	Is this opportunity part-time/contracting?	text	t
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, experience_id, value) FROM stdin;
1	1	Javascript
3	1	NodeJS
4	1	React
8	1	React Native
11	3	AngularJS
12	3	Javascript
13	3	Typescript
14	3	NodeJS
15	4	Product Strategy
16	4	Roadmaps
17	4	User Stories
24	6	User Research
25	1	User Research
26	6	Product Strategy
27	1	Product Strategy
28	6	UX Design
30	1	UX Design
31	6	Javascript
32	6	D3
33	6	AngularJS
34	6	NodeJS
43	1	User Stories
44	8	Javascript
45	8	D3
46	8	PHP
47	8	Python
48	8	User Stories
49	8	User Research
50	9	User Research
51	9	User Stories
52	9	UX Design
53	9	Java
54	9	Proposals
56	9	Bayesian Networks
57	9	Intelligent Agents
58	9	Machine Learning
59	9	Data Visualization
60	8	Data Visualization
61	6	Data Visualization
63	10	Data Science
64	10	UX Design
65	10	Java
66	10	Matlab
67	10	R Statistical Environment
68	8	R Statistical Environment
69	10	Python
70	10	ASP.NET
71	10	C#.NET
72	10	Javascript
73	10	User Research
74	11	R Statistical Environment
75	11	Data Science
76	12	R Statistical Environment
77	12	Machine Learning
78	12	Java
81	9	Project Lead
84	3	Team Lead
86	13	Java
87	14	Team Lead
88	14	Java
89	15	PHP
90	15	FileMaker
91	1	Roadmaps
92	10	Machine Learning
93	14	User Research
94	15	Javascript
95	16	Data Science
96	16	Machine Learning
97	11	Machine Learning
101	4	User Research
102	4	UX Design
103	8	Data Science
104	9	Product Lead
105	4	Product Lead
106	16	SciKit-Learn
107	16	NumPy
108	16	Python
109	16	Pandas
110	16	iPython/Jupyter Notebook
113	6	Prototyping
115	8	Prototyping
116	9	Prototyping
117	10	Prototyping
118	11	Prototyping
119	12	Prototyping
120	13	Prototyping
121	14	Prototyping
122	2	Go
123	2	NodeJS
124	2	Typescript
125	2	User Research
126	2	UX Design
127	5	AngularJS
128	5	D3
129	5	Data Visualization
130	5	Javascript
131	5	Machine Learning
132	5	Product Analytics
133	5	Team Lead
134	5	User Research
135	5	UX Design
136	7	Javascript
137	7	NodeJS
138	7	Objective-C
139	7	PHP
140	7	Product Analytics
142	7	User Stories
143	7	UX Design
141	7	User Research
144	2	React
145	3	React
146	1	Typescript
147	1	Wireframing
148	2	Wireframing
149	3	Wireframing
150	4	Wireframing
151	5	Wireframing
152	9	Wireframing
153	3	Code Review
154	5	Code Review
\.


--
-- Data for Name: themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.themes (id, user_id, name, tags) FROM stdin;
1	1	Frontend	{React,"React Native",Typescript,"UX Design","User Research",Wireframing,"Code Review"}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, hashed_password, current_session, name, username) FROM stdin;
1	bobness@gmail.com	2a9d119df47ff993b662a8ef36f9ea20	4c393d3e-288b-4155-a9fd-d77b58c49547	Bob Stark	bob.stark
\.


--
-- Name: experiences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experiences_id_seq', 16, true);


--
-- Name: facts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facts_id_seq', 3, true);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobs_id_seq', 15, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 31, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 4, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 154, true);


--
-- Name: themes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.themes_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: experiences experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);


--
-- Name: facts facts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facts
    ADD CONSTRAINT facts_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: jobs u_user_id_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT u_user_id_email UNIQUE (user_id, email);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_experiences_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_experiences_user_id ON public.experiences USING btree (user_id);


--
-- Name: ix_facts_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_facts_user_id ON public.facts USING btree (user_id);


--
-- Name: ix_jobs_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_jobs_user_id ON public.jobs USING btree (user_id);


--
-- Name: ix_messages_question_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_messages_question_id ON public.messages USING btree (question_id);


--
-- Name: ix_questions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_questions_user_id ON public.questions USING btree (user_id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_username ON public.users USING btree (username);


--
-- PostgreSQL database dump complete
--

