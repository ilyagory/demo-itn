--
-- PostgreSQL database dump
--

-- Dumped from database version 13.8
-- Dumped by pg_dump version 13.8

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
-- Name: itns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.itns (
    id integer NOT NULL,
    itn character varying(12) NOT NULL,
    content json
);


--
-- Name: itns_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.itns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: itns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.itns_id_seq OWNED BY public.itns.id;


--
-- Name: itns id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itns ALTER COLUMN id SET DEFAULT nextval('public.itns_id_seq'::regclass);


--
-- Name: itns itns_itn_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itns
    ADD CONSTRAINT itns_itn_key UNIQUE (itn);


--
-- Name: itns itns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itns
    ADD CONSTRAINT itns_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

