CREATE USER docker;
CREATE DATABASE docker;
USE docker;
CREATE TABLE user (UserID int, LastName varchar(255), FirstName varchar(255));
INSERT INTO user (LastName, FirstName) VALUES ("Jan", "Kowalski");