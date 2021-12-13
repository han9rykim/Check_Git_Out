CREATE DATABASE gResume;

use gResume;

CREATE TABLE user(
  username VARCHAR(30),
  type VARCHAR(30) DEFAULT 'Student',
  token VARCHAR(50),
  PRIMARY KEY(username));


CREATE TABLE commitlog(
  username VARCHAR(50) not null,
  content VARCHAR(50),
  stu_username varchar(50) not null,
  id VARCHAR(50),
  token VARCHAR(50) not null,
  PRIMARY KEY(id)
);
