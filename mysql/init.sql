CREATE USER docker;
CREATE DATABASE docker;
USE docker;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email varchar(255) NOT NULL,
  firstName varchar(255),
  lastName varchar(255),
  password varchar(255) NOT NULL,
  admin INT DEFAULT 0
);

CREATE TABLE spaces (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  capacity INT
);

CREATE TABLE desks (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  space_id INT NOT NULL
);

CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  desk_id INT NOT NULL,
  start DATETIME NOT NULL,
  end DATETIME NOT NULL
);

INSERT INTO spaces (
  name, capacity
) VALUES (
  "parter", 80
);

INSERT INTO spaces (
  name, capacity
) VALUES (
  "pierwsze piętro", 100
);

INSERT INTO users (
  email, firstName, lastName, password
) VALUES (
  "jan.kowalski@wp.pl", "Jan", "Kowalski", "pass"
);

INSERT INTO users (
  email, firstName, lastName, password, admin
) VALUES (
  "admin@wp.pl", "Adam", "Kowalski", "pass", 1
);
