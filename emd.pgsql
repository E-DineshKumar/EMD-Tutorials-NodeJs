--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

SET statement_timeout = 0;
SET lock_timeout = 0;
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
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    designation character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admins_id_seq OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: courseData; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."courseData" (
    id integer NOT NULL,
    courseid character varying(255) NOT NULL,
    section character varying(255) NOT NULL,
    data text NOT NULL,
    "videoLink" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."courseData" OWNER TO postgres;

--
-- Name: courseData_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."courseData_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."courseData_id_seq" OWNER TO postgres;

--
-- Name: courseData_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."courseData_id_seq" OWNED BY public."courseData".id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    courseid character varying(255) NOT NULL,
    coursename character varying(255) NOT NULL,
    imageurl character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    mobile bigint,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."courseData" ALTER COLUMN id SET DEFAULT nextval('public."courseData_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, name, email, password, designation, "createdAt", "updatedAt") FROM stdin;
2	admin	admin@admin.com	admin@1	super_admin	2018-03-29 10:46:31.504+05:30	2018-03-29 10:46:31.504+05:30
\.


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 2, true);


--
-- Data for Name: courseData; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."courseData" (id, courseid, section, data, "videoLink", "createdAt", "updatedAt") FROM stdin;
2	python-001	Print Function and Strings	## **Print Function and Strings**\n<iframe width="560" height="315" src="https://www.youtube.com/embed/UsCQXe1OHZk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n\nThe print function in Python is a function that outputs to your console window whatever you say you want to print out. At first blush, it might appear that the print function is rather useless for programming, but it is actually one of the most widely used functions in all of python. The reason for this is that it makes for a great debugging tool.\n\n"Debugging" is the term given to the act of finding, removing, and fixing errors and mistakes within code.\n\nIf something isn't acting right, you can use the print function to print out what is happening in the program. Many times, you expect a certain variable to be one thing, but you cannot see what the program sees. If you print out the variable, you might see that what you thought was, was not.\n\nYou can follow this tutorial with the video and the embedded console, via the text and consoles, or via your own installation of Python.\n\nNext up, strings, what are they? Strings are just "strings" of text, hence the name. Strings are a type of data. Another type of data is integers.\n\nTo build on the video, here are some examples:\n```py\nprint('Single Quotes')\nprint("double quotes")\n```\n\nWe're printing out a string. Notice that the quotes are single quotes. You can use single quotes or double quotes, but they need to be used together.\n\nWhile we're talking about strings and the print function, it would be useful to discuss concatenation. Concatenation just means the combination of things. You can use the "+" or the "," to join strings together. If you use a ",", then you will have a space in between the strings you joined. If you use a "+", then the strings will be strung together with no space. You will need to add one if you wanted.\n\nIf you use the "+" to join integers and floats together, then you will perform an arithmetic operation. If you use the ",", then it will print them out separately, with a space.\n\n```py\nprint('can do this',5)\n```\nYou cannot use the "+" to join strings with ints or floats, you must use the ",".\n\n```py\nprint('cannot do this:'+5)\n```\nIt is also important to bring up how to put quotes within strings. You can either put double quotes inside single quotes, singles inside doubles, or use the "\\" backslash. The \\ character is known as an escape character, and it will "escape" the characteristic of the following character and just take on the 'visual' aspect of it.\n\nThe purpose of the "escape character" is to escape various characteristics for characters. For example, a quotation, ", in a string might wreak havoc. Take for example: x = "He said, "Hello there!" "\n\nYeah, that's going to be a problem. There are obviously many options to avoid this specific problem, but one of them would be to use an escape character:\n\nx = "He said, \\"Hello there!\\" "\n\nIf you do a print(x), you will not see the escape characters, and you will see the quotes. Sometimes you want to show the escape character as well:\n\nx = "An escape character is a \\"\n\nHow might you solve that?\n\nHere are some examples of quotation rules:\n```py\nprint('Can't do this')\n```\n```py\nprint('you\\'ll have success here')\n```\n```py\nprint("you'll have success here too")\n```\nIt is also important to bring up how to put quotes within strings. You can either put double quotes inside single quotes, singles inside doubles, or use the "\\" backslash. The \\ character is known as an "escape" character, and it will "escape" the characteristic of the following character and just take on the 'visual' aspect of it. Here are some examples of quotation rules:\n\nThat covers the basics of strings for now.	\N	2018-05-10 16:51:47.441+05:30	2018-05-10 16:51:47.441+05:30
1	python-001	Introduction	## **Python 3 Programming Introduction Tutorial**\n\n<iframe width="600" height="315" src="https://www.youtube.com/embed/IX6mc9l6tY4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n\n**Why Python?**\n\nPython is very beginner-friendly. The syntax (words and structure) is extremely simple to read and follow, most of which can be understood even if you do not know any programming. Let me show you:\n```py\nGarage = "Ferrari", "Honda", "Porsche", "Toyota"\n\nfor each_car in Garage:\n\tprint(each_car)\n```\n"print()" is a built-in Python function that will output some text to the console.\n\nWhen someone says to "print to the console," they are referring to where information from your program is ouput. This might be a command prompt (CMD.exe), the terminal for Mac/Linux users, or the interactive prompt in IDLE. You will see an example of "output to console" below.\n\nLooking at the code about cars in the garage, can you guess what will happen? You probably have a general idea. For each_car in the garage, we're going to do something. What are we doing? We are printing each car.\n\nSince "printing" outputs some text to the "console," you can probably figure out that the console will say something like "Ferrari, Honda, Porsche, Toyota."\nWhat can Python do?\n\nPython is a fully-functional programming language that can do anything almost any other language can do, at comparable speeds.\n\nPython is capable of threading and GPU processing just like any other language. Most of the data processing modules are actually just Python wrappers around C/C++ code.\n\n"Modules" are pre-written Python code that you "import" in your Python program. Since there are many tasks that people commonly do, we have modules that people have written that do these tasks for you, and they usually do them in the cleanest and most efficient method possible. Sometimes you will see people refer to "DRY." This stands for Don't Repeat Yourself, which often also translates into "Don't Repeat Someone Else."\n\nThe phrase "wrapper" means that someone has placed, like a wrapper, Python code over another language. So, when you have a Python wrapper around C++ code, what someone has done is written some Python code that interacts with the C++ language. This allows you to make use of various aspects of the language being wrapped, in this case C++, without actually needing to know or understand that language.\n\nThus, Python can be used to make games, do data analysis, control robot and hardware, create GUIs, or even to create websites.\n\n"GUI" stands for Graphical User Interface, and is used to describe a program that incorporates graphics to make the program more interactive for the user.\n\n99% of the code that brings this very page to you is actually Python code!\n\nIf you're curious to see some examples of what you can do with Python code, browse around the topics in the Home Page.	\N	2018-05-10 10:40:57.689+05:30	2018-05-11 16:34:04.847+05:30
3	python-001	Math basics with Python 3	## **Math basics with Python 3**\n<iframe width="600" height="315" src="https://www.youtube.com/embed/BvgPM9-krOY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n\nMath is a pretty popular topic, so we should probably learn how to do it in Python 3. Luckily for us, math is so very popular that it works extremely simply.\n```py\n1+3\n```\nHere, we have some simple addition, the returned number is 4.\n```py   \n4*4\n```\nNext up, multiplication, fancy stuff! The return is 16.\n\n```py\n5-2\n```\nSubtraction, even fancier. Return will be 3\n```py   \n5/2\n```\n\n\nDivision, now this is actually fancy, based on Python's history.\n\nIn Python 2, the division does not necessarily work in the way expected. If you divide two whole numbers, you will be returned a whole number. You must divide one of the numbers as a float in order to get a proper return. This was changed in Python 3+, and now you always get expected division, yay!\n\n```py\n#exponents\n\t\t4**4\n```\n\n\nThere is another way to do exponents, but this works just fine, and is a familiar syntax for it.\n\nThat's it for basic math. It really is quite simple. Math is quite integral to a lot of programs, so it is very nice that it is kept simple enough.	\N	2018-05-10 17:18:44.927+05:30	2018-05-11 18:03:41.809+05:30
4	python-001	While Loop	## **Python 3 While Loop tutorial**\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/jSs58VZVLw8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n\nThe two distinctive loops we have in Python 3 logic are the "for loop" and the "while loop." Both of them achieve very similar results, and can almost always be used interchangeably towards a goal. Many times it comes down to programmer preference, or is reliant on efficiency. Generally, the for loop can be more efficient than the while loop, but not always.\n\nThe idea of the While loop\n\nWhile something is the case, do the following block of code.\n\nHere is an example of a while loop:\n```py\ncondition = 1\n\nwhile condition < 10:\n\tprint(condition)\n\tcondition += 1\n```\n\n\nIn this code, we have defined a variable name condition, and condition starts at a value of 1.\n\nNext, we specify the terms of the while statement, which are : While the condition variable is less than 10, we will print the condition variable out. After printing out the condition, we will add 1 to the current condition.\n\nThis process will continue until condition equals 10.	\N	2018-05-11 09:48:13.068+05:30	2018-05-11 18:14:24.632+05:30
\.


--
-- Name: courseData_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."courseData_id_seq"', 4, true);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (courseid, coursename, imageurl, "createdAt", "updatedAt") FROM stdin;
angular-001	Angular 4	uploads/3ac2138e-4c8f-4223-9e79-708ac74437cd.png	2018-05-07 11:56:09.709+05:30	2018-05-07 11:56:09.709+05:30
python-001	PYTHON	uploads/1921bd61-2de0-4a29-884d-cf58cb4c2480.png	2018-05-07 15:27:55.864+05:30	2018-05-07 15:27:55.864+05:30
nodejs-001	NodeJS	uploads/3d333fd8-5656-4452-bb18-e9053cb2b3d2.png	2018-05-11 18:14:46.137+05:30	2018-05-11 18:14:46.137+05:30
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, name, email, password, mobile, "createdAt", "updatedAt") FROM stdin;
8	DineshKumar	dineshkumar.e20@gmail.com	dinesh@1	7708840314	2018-03-26 20:05:39.905+05:30	2018-03-26 20:05:39.905+05:30
9	Aravind	aravind@gmail.com	aravind@1	9876543210	2018-03-28 11:12:25.607+05:30	2018-03-28 11:12:25.607+05:30
10	Rajaram	rajaram@gmail.com	raja@1	9876543210	2018-03-28 14:51:32.378+05:30	2018-03-28 14:51:32.378+05:30
11	anand	anand	anand	9884857969	2018-03-28 16:44:32.854+05:30	2018-03-28 16:44:32.854+05:30
12	Praveen	praveenseven15@gmail.com	praveen@1	9442780525	2018-05-03 10:59:28.225+05:30	2018-05-03 10:59:28.225+05:30
13	Suresh	sureshreddy@gmail.com	suresh@1	8309489594	2018-05-17 13:20:39.372+05:30	2018-05-17 13:20:39.372+05:30
14	Gautham	gauthampughazhendhi@gmail.com	gautham@1	9940161197	2018-05-17 14:01:30.823+05:30	2018-05-17 14:01:30.823+05:30
\.


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 14, true);


--
-- Name: admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: courseData_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."courseData"
    ADD CONSTRAINT "courseData_pkey" PRIMARY KEY (id);


--
-- Name: courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (courseid);


--
-- Name: students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

