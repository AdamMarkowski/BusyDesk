CREATE USER docker;
CREATE DATABASE docker;
USE docker;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email varchar(255) NOT NULL,
  firstName varchar(255),
  lastName varchar(255),
  password varchar(255) NOT NULL,
  admin BIT DEFAULT 0
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
  "jan.kowalski@onet.pl", "Jan", "Kowalski", "pass"
);

-- CREATE TABLE `programming_languages`
-- (
--   `id`            INT(11) NOT NULL auto_increment ,
--   `name`          VARCHAR(255) NOT NULL ,
--   `released_year` INT NOT NULL ,
--   `githut_rank`   INT NULL ,
--   `pypl_rank`     INT NULL ,
--   `tiobe_rank`    INT NULL ,
--   `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
--   `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
--   PRIMARY KEY (`id`),
--   UNIQUE `idx_name_unique` (`name`(255))
-- )
