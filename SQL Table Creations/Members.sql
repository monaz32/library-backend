
CREATE TABLE Members(
	accountID		int auto_increment,
	phoneNum		varchar(100),
	email 			varchar(100) NOT NULL,
	name			varchar(100),
	fines			DECIMAL,
	UNIQUE(email),
	PRIMARY KEY(accountID)
);


alter table members auto_increment = 1000;