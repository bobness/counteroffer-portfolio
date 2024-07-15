--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 14.12 (Homebrew)

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
12	1	MS in Information Science	Pennsylvania State University	2007-09-01	2010-05-01	● Relevant Classes: Pattern Recognition, Human-Computer Interaction, Information Management, Organizational Informatics.\n● Research: Decision tree induction machine learning using R.\n● Thesis: Hand gesture recognition using machine learning for immersive training systems in Java.\n● Honors: Jordan H. Rednor Graduate Fellowship.
11	1	Data Scientist (Graduate Intern)	ScanScout	2008-05-01	2008-08-01	● Analyzed behavioral data mining system to optimize video ad placement (in R)\n● Developed optimizer evaluation system using statistical significance measures (in R embedded in LaTeX)
13	1	Software Engineering Team Lead (Intern)	IBM	2007-05-01	2007-08-01	● Led team that developed a web renderer for IBM’s XML dialect for user interfaces (Abstract User Interface Markup Language, AUIML)
9	1	Government R&D Scientist & Project Lead	Charles River Analytics	2010-10-01	2013-03-01	● Technical lead for over 5 government R&D projects involving data visualizations and machine learning.\n● Published peer-reviewed research papers project outcomes.\n● Managed the development and maintenance of a Bayesian network machine learning toolkit.
10	1	Government R&D Engineer	BBN Technologies	2008-08-01	2010-10-01	● Developed & user-tested gesture recognition system using hidden Markov Models (Java, Matlab)\n● Designed & developed a distributed natural language processing pipeline (Python)\n● Developed a web app for team collaboration (ASP/C# .NET, HTML, CSS, JS)
3	1	Lead Frontend Engineer	Tanium	2016-08-01	2018-06-01	● Led the frontend engineering team for the core administrative product, working with design.\n● Managed SOAP-based backend request flow to optimize tech stack performance.\n● Provided expert guidance through code reviews, ensuring alignment with project goals.\n● Implemented CI/CD practices and and Agile methodology to enhance development efficiency.
4	1	Lead UX Engineer & Product Manager	Driven Inc.	2015-07-01	2016-08-01	● Led frontend engineering team and supported backend development to boost system performance, utilizing Agile methodology.\n● Enhanced user experience through user research, product analytics, and intuitive feature flows.\n● Directed a strategic pivot targeting cluster operators/administrators, collaborating with sales, marketing, and executives.
14	1	Software Engineering Team Lead (Intern)	IBM	2005-01-01	2005-08-01	● Started out developing software with SQL-embedded C using IBM’s DB2 database system\n● Was promoted to lead a summer team to create a tool to aid bug-fixing these applications\n● Interviewed developer “customers” to determine their software development habits and needs
1	1	Founder	Datagotchi Labs	2018-01-01	\N	● Addressing the trustworthy AI problem by comparing Bayesian networks to deep neural networks on output quality, ease of development, and training costs.\n● Enabling sharing of online news summaries with a social app and data analytics to increase reader engagement in a two-sided marketplace solution to the news reliability problem.\n● Improving candidate-job fit with a skill visualization app and data analytics to target candidates in a two-sided marketplace solution to the candidate-recruiter discovery problem.
16	1	Data Science Teaching Assistant	General Assembly	2016-05-01	2016-07-31	● Tutored students on descriptive and inferential statistics—data analysis, and machine learning models (linear and logistic regression, k-nearest neighbors, decision trees/random forests, latent dirichlet allocation/LDA, and time series autocorrelation).\n● Mastered Python technologies (SK Learn, NumPy, Pandas, iPython/Jupyter Notebook).
18	1	Founder & Developer	Simhack	2002-01-01	2004-01-01	● A massive, multiplayer online game about computer security; written first with PHP with a MySQL database, and later with Java servlets (J2EE).
15	1	IT Administrator & Web/Database Developer	Great Lakes Label, LLC	2002-01-01	2004-01-01	● Worked part-time (full-time in summers) while in high school and early college.\n● Created an ERP system that tracked all aspects of the business, including printing inventory, purchase orders, and payments.\n● Implemented with FileMaker Pro database and later hooked up to a custom PHP ecommerce website so customers could place orders in the system.
7	1	Lead UX Engineer	Collusion	2013-12-01	2014-11-01	● Led frontend team and supported middle-tier and back-end development to ensure a high-performing application stack.\n● Deployed a responsive web interface to complement the iOS app, ensuring cross-platform compatibility.
6	1	Co-Founder & UX Consultant	Social Ergonomics Consulting	2014-11-01	2015-07-01	● Assisted user research of and solutions to clients’ problems.\n● Led the development of front-end prototypes with Javascript (D3.js) data visualizations.\n● Developed comprehensive dashboards integrating user research data, feature roadmaps, and evaluation results for product managers and startup founders.
8	1	Full-Stack Software Engineer & Assistant Product Manager	Exaptive	2013-03-01	2013-10-01	● Worked with the founder to define product direction and target market segments.\n● Developed data analytics and visualizations to provide insights from complex datasets.
20	1	Founder & Developer	The Disconnection Network	2003-01-01	2007-01-01	● A network of web apps for shared blogging, a Shoutcast radio station, and customer web pages
21	1	BS in Computer Science	Michigan Technological University	2003-08-01	2007-05-01	\N
17	1	Founder & Developer	Infinity Computing Services	2003-01-01	2005-01-01	● Created company that provided web hosting, email hosting, and IT support services; had several customers and web site paid for itself
\.


--
-- Data for Name: facts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facts (id, user_id, key, value, job_id) FROM stdin;
4	1	Application to Raft	Senior UX Engineer	\N
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
26	6	Product Strategy
27	1	Product Strategy
28	6	UX Design
30	1	UX Design
31	6	Javascript
33	6	AngularJS
34	6	NodeJS
43	1	User Stories
44	8	Javascript
46	8	PHP
47	8	Python
48	8	User Stories
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
94	15	Javascript
95	16	Data Science
96	16	Machine Learning
97	11	Machine Learning
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
126	2	UX Design
136	7	Javascript
137	7	NodeJS
138	7	Objective-C
139	7	PHP
140	7	Product Analytics
142	7	User Stories
143	7	UX Design
144	2	React
145	3	React
146	1	Typescript
147	1	Wireframing
148	2	Wireframing
149	3	Wireframing
150	4	Wireframing
152	9	Wireframing
153	3	Code Review
155	17	PHP
156	17	MySQL
157	17	VPS Administration
158	18	PHP
159	18	MySQL
161	18	Javascript
162	19	Javascript
163	19	PHP
166	19	Typescript
167	19	PostgreSQL
168	20	PHP
169	20	PostgreSQL
170	20	Javascript
171	20	Shoutcast Radio
172	1	HTML
173	1	CSS
24	6	UX Research
25	1	UX Research
49	8	UX Research
50	9	UX Research
73	10	UX Research
93	14	UX Research
101	4	UX Research
125	2	UX Research
32	6	D3.js
141	7	UX Research
174	1	Cloud-Native Environment
175	1	Gradle Dependency Manager
176	1	Yarn Package Manager
177	1	Java
178	1	Customer-Obsessed Mindset
179	1	Microservices
180	1	Responsive Design
181	2	Microservices
182	3	Microservices
183	3	HTML
184	3	CSS
185	3	UX Design
186	3	Yarn Package Manager
187	3	NPM Package Manager
188	3	Go
189	3	Customer-Obsessed Mindset
190	3	Public-Sector Modernization
191	3	Designer Collaboration
45	8	D3.js
128	4	D3.js
160	18	Java
192	3	Engineer Collaboration
127	4	AngularJS
129	4	Data Visualization
130	4	Javascript
131	4	Machine Learning
132	4	Product Analytics
133	4	Team Lead
154	4	Code Review
193	4	HTML
194	4	CSS
195	4	Cloud-Native Environment
196	4	NPM Package Manager
197	4	Java
198	4	Customer-Obsessed Mindset
199	4	Engineering Collaboration
200	4	Founder Collaboration
201	4	Streaming Tools
202	4	Microservices
203	4	Event-Driven Architecture
204	16	Map-Based UIs
205	6	HTML
206	6	CSS
207	6	NPM Package Manager
208	6	Customer-Obsessed Mindset
209	6	Microservices
210	7	HTML
211	7	CSS
212	7	Responsive Design
213	7	Cloud-Native Environment
214	7	NPM Package Manager
215	7	Customer-Obsessed Mindset
216	7	Microservices
218	8	CSS
219	8	HTML
220	8	UX Design
221	8	Cloud-Native Environment
222	8	Map-Based UIs
223	8	Customer-Obsessed Mindset
224	8	Microservices
225	9	Gradle Dependency Manager
226	9	Secret Clearance
227	9	Map-Based UIs
228	9	Customer-Obsessed Mindset
229	9	Public-Sector Modernization
230	9	Designer Collaboration
231	9	Engineering Collaboration
232	9	Event-Driven Architecture
233	10	HTML
234	10	CSS
235	10	ASP/C#.NET
236	10	Gradle Dependency Manager
237	10	Map-Based UIs
238	10	Customer-Obsessed Mindset
239	10	Public-Sector Modernization
240	10	Event-Driven Architecture
241	12	STEM
242	12	UX Education
243	13	Team Lead
244	13	HTML
245	13	CSS
246	14	Customer-Obsessed Mindset
\.


--
-- Data for Name: themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.themes (id, user_id, name, tags) FROM stdin;
3	1	https://boards.greenhouse.io/raft/jobs/5231218004	{HTML,CSS,React,Javascript,Typescript,D3.js,"UX Research","UX Design","Responsive Design","Cloud-Native Environment","Gradle Dependency Manager","NPM Package Manager","Yarn Package Manager","Secret Clearance","Map-Based UIs",Java,Python,Go,"Customer-Obsessed Mindset","Public-Sector Modernization",Microservices,"Streaming Tools",STEM,"UX Education"}
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

SELECT pg_catalog.setval('public.experiences_id_seq', 21, true);


--
-- Name: facts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facts_id_seq', 4, true);


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

SELECT pg_catalog.setval('public.tags_id_seq', 246, true);


--
-- Name: themes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.themes_id_seq', 3, true);


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

