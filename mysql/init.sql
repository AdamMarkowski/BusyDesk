CREATE USER docker;
CREATE DATABASE docker;
USE docker;
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email varchar(255),
	firstName varchar(255),
	lastName varchar(255),
	password varchar(255)
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
