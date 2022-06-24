-- Table: servarea_addrobj

-- DROP TABLE servarea_addrobj;

CREATE TABLE servarea_addrobj
(
  actstatus integer,
  aoguid character varying(36),
  aoid character varying(36) NOT NULL,
  aolevel integer,
  areacode character varying(3),
  autocode character varying(3),
  centstatus integer,
  citycode character varying(3),
  code character varying(17),
  currstatus integer,
  enddate date,
  formalname character varying(120),
  ifnsfl character varying(4),
  ifnsul character varying(4),
  nextid character varying(36),
  offname character varying(120),
  okato character varying(11),
  oktmo character varying(11),
  operstatus integer,
  parentguid character varying(36),
  placecode character varying(3),
  plaincode character varying(15),
  postalcode character varying(6),
  previd character varying(36),
  regioncode character varying(2),
  shortname character varying(10),
  startdate date,
  streetcode character varying(4),
  terrifnsfl character varying(4),
  terrifnsul character varying(4),
  updatedate date,
  ctarcode character varying(3),
  extrcode character varying(4),
  sextcode character varying(3),
  livestatus integer,
  normdoc character varying(36),
  CONSTRAINT servarea_addrobj_pkey PRIMARY KEY (aoid)
);
