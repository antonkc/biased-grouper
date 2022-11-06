CREATE TABLE IF NOT EXISTS Users (
	id	SERIAL PRIMARY KEY,
	name	VARCHAR(32),
	inf_type_1	VARCHAR(8),
	inf_type_2	VARCHAR(8),
	inf_type_3	VARCHAR(8),
	inf_type_4	VARCHAR(8),
	inf_type_5	VARCHAR(8),
	inf_type_6	VARCHAR(8),
	age INT
);

INSERT INTO users
	(name, age, inf_type_1, inf_type_2, inf_type_3, inf_type_4, inf_type_5, inf_type_6)
VALUES
	('Jose',40,'ESP','10','TP01','','TEST',''),
	('Juan',45,'USA','01','TP01','','',''),
	('Iban',30,'ITA','01','TP01','','',''),
	('Asta',26,'ESP','02','TP02','','',''),
	('Moor',34,'BRA','03','TP02','','TEST',''),
	('Jimm',21,'FRA','05','TP01','','COM',''),
	('Jeny',43,'DEU','02','TP02','LEG','',''),
	('Mari',28,'ESP','01','TP01','LEG','','AGI'),
	('Lara',22,'DEU','01','TP04','ASOC','','');