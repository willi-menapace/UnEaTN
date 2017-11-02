DROP DATABASE IF EXISTS unieatn;

CREATE DATABASE unieatn;
USE unieatn;

DROP USER IF EXISTS 'mluser'@'%';

CREATE USER 'mluser'@'%' IDENTIFIED BY 'sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ';

GRANT ALL ON unieatn.* TO 'mluser'@'%';

FLUSH PRIVILEGES;

CREATE TABLE measures (
	measure_id INT PRIMARY KEY auto_increment,
	canteen_id INT NOT NULL,
	arrive_time DATETIME NOT NULL,
	wait_seconds INT NOT NULL
);

CREATE TABLE previsions (
	prevision_id INT PRIMARY KEY auto_increment,
	opening_hour_id INT NOT NULL,
	generation_date DATETIME NOT NULL
);

CREATE TABLE prevision_data (
	prevision_data_id INT PRIMARY KEY auto_increment,
	prevision_id INT NOT NULL,
	arrive_time TIME NOT NULL,
	wait_seconds INT NOT NULL,
	FOREIGN KEY (prevision_id) REFERENCES previsions(prevision_id)
)
