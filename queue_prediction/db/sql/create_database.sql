DROP DATABASE IF EXISTS uneatn;

CREATE DATABASE uneatn;
USE uneatn;

DROP USER IF EXISTS 'mluser'@'%';

CREATE USER 'mluser'@'%' IDENTIFIED BY 'sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ';

GRANT ALL ON uneatn.* TO 'mluser'@'%';

FLUSH PRIVILEGES;

CREATE TABLE canteens (
	canteen_id INT PRIMARY KEY auto_increment,
	name VARCHAR(100) NOT NULL,
	codename VARCHAR(100) NOT NULL
);

INSERT INTO canteens(canteen_id, name, codename) VALUES
(1, 'Pasto lesto', 'lesto'),
(2, 'Povo 0', 'povo0'),
(3, 'Povo 1', 'povo1');

CREATE TABLE opening_hours (
	opening_hour_id INT PRIMARY KEY auto_increment,
	canteen_id INT NOT NULL,
	weekday INT NOT NULL,
	open_time TIME NOT NULL,
	close_time TIME NOT NULL,
	FOREIGN KEY (canteen_id) REFERENCES canteens(canteen_id)
);


INSERT INTO opening_hours(canteen_id, weekday, open_time, close_time) VALUES
(1, 0, '11:45', '14:30'),
(1, 1, '11:45', '14:30'),
(1, 2, '11:45', '14:30'),
(1, 3, '11:45', '14:30'),
(1, 4, '11:45', '14:30'),
(1, 5, '11:45', '14:30'),
(2, 0, '11:45', '14:30'),
(2, 1, '11:45', '14:30'),
(2, 2, '11:45', '14:30'),
(2, 3, '11:45', '14:30'),
(2, 4, '11:45', '14:30'),
(2, 5, '11:45', '14:30'),
(3, 0, '11:45', '14:30'),
(3, 1, '11:45', '14:30'),
(3, 2, '11:45', '14:30'),
(3, 3, '11:45', '14:30'),
(3, 4, '11:45', '14:30'),
(3, 5, '11:45', '14:30');

CREATE TABLE measures (
	measure_id INT PRIMARY KEY auto_increment,
	canteen_id INT NOT NULL,
	arrive_time DATETIME NOT NULL,
	wait_seconds INT NOT NULL,
	FOREIGN KEY (canteen_id) REFERENCES canteens(canteen_id)
);

CREATE TABLE previsions (
	prevision_id INT PRIMARY KEY auto_increment,
	opening_hour_id INT NOT NULL,
	generation_date DATETIME NOT NULL,
	FOREIGN KEY (opening_hour_id) REFERENCES opening_hours(opening_hour_id)
);

CREATE TABLE prevision_data (
	prevision_data_id INT PRIMARY KEY auto_increment,
	prevision_id INT NOT NULL,
	arrive_time TIME NOT NULL,
	wait_seconds INT NOT NULL,
	FOREIGN KEY (prevision_id) REFERENCES previsions(prevision_id)
)
